import ExchangeModel from "./models/Exchange.model";
import {
  CreateExchangeType,
  PriceType,
  QueryInputType,
  Status,
  Transaction,
} from "./types";

type CreateArgs = {
  input: CreateExchangeType;
};

type QueryArgs = {
  input: QueryInputType;
};

/*
we have two resolvers, one query & one mutation
*/

const resolvers = {
  Query: {
    /*
    we use getExchanges query by providing an input object for filtering
    if no input object supplied, unfiltered data will return
    */
    getExchanges: async (_: undefined, args: QueryArgs) => {
      /*
      default sorting is by dateTime descending
      */

      const {
        input: { fromDate, toDate, type, pageNumber, pageSize },
      } = args;

      /*
        date parameters are received as ISO date strings (zulu dates)        
        */
      let toDate2 = new Date(toDate);

      /*incrementing toDate by by day to cover the last day*/
      toDate2.setDate(toDate2.getDate() + 1);

      /*will add filter parameters to this params object*/
      const params: any = { dateTime: { $gte: fromDate, $lte: toDate2 } };

      /*set type param only when LivePrice or Exchanged selected */
      if (type == PriceType.LivePrice || type == PriceType.Exchanged) {
        params.type = type;
      }

      let skip = pageSize * (pageNumber - 1);

      return await ExchangeModel.find({ ...params })
        .sort({
          dateTime: -1,
        })
        .skip(skip)
        .limit(pageSize);
    },
  },

  Mutation: {
    /*
    createExchange mutation returns a Transaction type which includes newly created Exchange object and a status field
    */
    createExchange: async (
      _: undefined,
      args: CreateArgs
    ): Promise<Transaction> => {
      const {
        input: { amount1, amount2, currencyFrom, currencyTo, type },
      } = args;

      const exchange = new ExchangeModel({
        dateTime: new Date(),
        amount1,
        amount2,
        currencyFrom,
        currencyTo,
        type,
      });

      await exchange.save();

      /*if saved successfully, then status approved*/
      return {
        exchange,
        status: Status.Approved,
      };
    },
  },
};

export default resolvers;

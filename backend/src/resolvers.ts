import { GraphQLResolveInfo } from "graphql";
import ExchangeModel from "./models/Exchange.model";
import { CreateExchangeType, PriceType, Status, Transaction } from "./types";

type CreateArgs = {
  input: CreateExchangeType;
};

type QueryInputType = {
  fromDate: Date;
  toDate: Date;
  type: PriceType;
  pageNumber: number;
};

type QueryArgs = {
  input: QueryInputType;
};

const resolvers = {
  Query: {
    getExchanges: async (_: undefined, args: QueryArgs) => {
      let pageSize = parseInt(process.env.PAGE_SIZE as string);
      if (args.input) {
        const {
          input: { fromDate, toDate, type, pageNumber = 0 },
        } = args;

        let toDate2 = new Date(toDate);

        /*incrementing toDate by by day to cover the last day*/
        toDate2.setDate(toDate2.getDate() + 1);
        const params: any = {};
        params.dateTime = { $gte: fromDate, $lte: toDate2 };

        if (type == PriceType.LivePrice || type == PriceType.Exchanged) {
          params.type = type;
        }

        let result = await ExchangeModel.find({ ...params })
          .sort({ dateTime: -1 })
          .skip(pageSize * pageNumber)
          .limit(pageSize);

        return result;
      } else {
        return await ExchangeModel.find()
          .sort({ dateTime: -1 })
          .limit(pageSize);
      }
    },
  },

  Mutation: {
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

      return {
        exchange,
        status: Status.Approved,
      };
    },
  },
};

export default resolvers;

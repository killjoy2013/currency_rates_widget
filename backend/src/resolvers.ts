import { GraphQLResolveInfo } from "graphql";
import Exchange from "./models/Exchange.model";
import { CreateExchangeType, PriceType, Status, Transaction } from "./types";

type CreateArgs = {
  input: CreateExchangeType;
};

type QueryInputType = {
  fromDate: Date;
  toDate: Date;
  type: PriceType;
};

type QueryArgs = {
  input: QueryInputType;
};

const resolvers = {
  Query: {
    getExchanges: async (_: undefined, args: QueryArgs) => {
      if (args.input) {
        const {
          input: { fromDate, toDate, type },
        } = args;

        const params: any = {};
        if (fromDate != toDate) {
          params.dateTime = { $gte: fromDate, $lte: toDate };
        }

        if (type == PriceType.LivePrice || type == PriceType.Exchanged) {
          params.type = type;
        }

        return await Exchange.find({ ...params })
          .sort({ dateTime: -1 })
          .limit(5);
      } else {
        return await Exchange.find().sort({ dateTime: -1 }).limit(5);
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

      const exchange = new Exchange({
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

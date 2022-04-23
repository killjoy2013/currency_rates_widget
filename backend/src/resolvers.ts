import { GraphQLResolveInfo } from "graphql";
import Exchange from "./models/Exchange.model";

enum PriceType {
  All = "All",
  Exchanged = "Exchanged",
  LivePrice = "LivePrice",
}

type CreateInputType = {
  currencyFrom: string;
  amount1: number;
  currencyTo: string;
  amount2: number;
  type: PriceType;
};

type CreateArgs = {
  input: CreateInputType;
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

        // console.log({ params });
        // console.count("getExchanges - ");
        // console.log("****************************");

        let result = await Exchange.find({ ...params })
          .sort({ dateTime: -1 })
          .limit(10);

        return result;
      } else {
        return await Exchange.find().sort({ dateTime: -1 }).limit(10);
      }
    },
  },

  Mutation: {
    createExchange: async (_: undefined, args: CreateArgs) => {
      const {
        input: { amount1, amount2, currencyFrom, currencyTo, type },
      } = args;

      console.log({ amount1, amount2, currencyFrom, currencyTo, type });

      const exchange = new Exchange({
        dateTime: new Date(),
        amount1,
        amount2,
        currencyFrom,
        currencyTo,
        type,
      });

      await exchange.save();

      return exchange;

      console.log(exchange);
    },
  },
};

export default resolvers;

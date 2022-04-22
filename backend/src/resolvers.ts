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

const resolvers = {
  Query: {
    getExchanges: async (_: undefined, args: any) => {
      const { startDate, endDate, type } = args;

      // console.log({ startDate, endDate, currencyFrom });
      const params: any = {};

      if (startDate != endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      if (type == PriceType.LivePrice || type == PriceType.Exchanged) {
        params.type = type;
      }

      console.log({ params });
      console.count("getExchanges - ");
      console.log("****************************");

      let result = await Exchange.find({ ...params })
        .sort({ dateTime: -1 })
        .limit(10);

      // console.log({ result });

      return result;
    },

    // filterExchanges: async (_: undefined, date: Date) => {
    //   let dateParam = new Date(date);

    //   console.log("filterExchanges", { date, dateParam });

    //   //todo
    //   let dell = new Date(2022, 3, 22);
    //   let result = await Exchange.find({
    //     dateTime: { $lte: dell },
    //   });
    //   // let result = await Exchange.find({
    //   //   currencyTo: "USD",
    //   // });

    //   console.log({ dell, result });

    //   return result;
    // },
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

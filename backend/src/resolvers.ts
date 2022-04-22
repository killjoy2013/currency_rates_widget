import { GraphQLResolveInfo } from "graphql";
import Exchange from "./models/Exchange.model";

enum PriceType {
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
      const { startDate, endDate, currencyFrom } = args;

      // console.log({ startDate, endDate, currencyFrom });

      console.log("getExchanges");

      let result = [];

      if (currencyFrom) {
        result = await Exchange.find({
          currencyFrom,
        });
      } else {
        result = await Exchange.find();
      }

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
    },
  },
};

export default resolvers;

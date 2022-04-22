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
    getAllExchanges: async () => {
      console.log("getAllExchanges called");

      return await Exchange.find();
    },
    filterExchanges: async (_: undefined, date: Date) => {
      let dateParam = new Date(date);

      // console.log({ date, dateParam });

      // let utcc = Date.UTC(2022, 4, 21, 13, 30);
      // let dell = new Date(Date.UTC(2021, 4, 21, 13, 30));

      //todo
      // let result = await Exchange.find({
      //   dateTime: { $lte: date },
      // });
      //return result;

      //temmmmp
      return await Exchange.find();
    },
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

import mongoose, { Schema as MongooseSchema } from "mongoose";
import { Exchange } from "../types";
import CurrencySchema from "./Currency.schema";

/*
Here we create Mongoose Exchange schema.
currencyFrom & currencyTo are created as sub documents of type Currency
*/
const ExchangeSchema = new MongooseSchema<Exchange>({
  fakeCycleId: {
    type: MongooseSchema.Types.Number,
    required: false,
  },
  dateTime: {
    type: MongooseSchema.Types.Date,
    required: true,
  },
  currencyFrom: {
    type: CurrencySchema,
    required: true,
  },
  amount1: {
    type: MongooseSchema.Types.Number,
    required: true,
  },
  currencyTo: {
    type: CurrencySchema,
    required: true,
  },
  amount2: {
    type: MongooseSchema.Types.Number,
    required: true,
  },
  type: {
    type: MongooseSchema.Types.String,
    required: true,
  },
});

const ExchangeModel = mongoose.model("exchange", ExchangeSchema);

export default ExchangeModel;

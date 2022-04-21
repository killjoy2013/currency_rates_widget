import mongoose, { Schema as MongooseSchema } from "mongoose";

const ExchangeSchema = new mongoose.Schema({
  dateTime: {
    type: MongooseSchema.Types.Date,
    required: true,
  },
  currencyFrom: {
    type: MongooseSchema.Types.String,
    required: true,
  },
  amount1: {
    type: MongooseSchema.Types.Number,
    required: true,
  },
  currencyTo: {
    type: MongooseSchema.Types.String,
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

const Exchange = mongoose.model("exchange", ExchangeSchema);
export default Exchange;

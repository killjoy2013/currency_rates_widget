import mongoose, { Schema as MongooseSchema } from "mongoose";
import { Currency } from "../types";

const CurrencySchema = new MongooseSchema<Currency>({
  name: {
    type: MongooseSchema.Types.String,
    required: true,
  },
  abbr: {
    type: MongooseSchema.Types.String,
    required: true,
  },
});

export default CurrencySchema;

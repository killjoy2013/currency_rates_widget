import mongoose, { Schema as MongooseSchema } from "mongoose";
import { Currency } from "../types";

/*
Currency model needs to have both name and abbr (abbreviation) fields. 
Both fields are displayed in different components
*/

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

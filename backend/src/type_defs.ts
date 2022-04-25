import { gql } from "apollo-server-express";

/*
This is where we create our GraphQL schema in schema first (SDL first) fashion
*/

const typeDefs = gql`
  scalar Date

  enum PriceType {
    All
    Exchanged
    LivePrice
  }

  enum Status {
    Approved
    Rejected
  }

  type Currency {
    name: String!
    abbr: String!
  }

  type Exchange {
    id: ID
    fakeCycleId: Int
    dateTime: Date
    currencyFrom: Currency
    amount1: Float
    currencyTo: Currency
    amount2: Float
    type: PriceType
  }

  type Transaction {
    exchange: Exchange!
    status: Status!
  }

  type Query {
    getExchanges(input: QueryInput): [Exchange!]!
  }

  type Mutation {
    createExchange(input: CreateInput!): Transaction!
  }

  input CurrencyInput {
    name: String!
    abbr: String!
  }

  input CreateInput {
    currencyFrom: CurrencyInput!
    amount1: Float!
    currencyTo: CurrencyInput!
    amount2: Float!
    type: PriceType!
  }

  input QueryInput {
    fromDate: Date
    toDate: Date
    type: PriceType
  }
`;

export default typeDefs;

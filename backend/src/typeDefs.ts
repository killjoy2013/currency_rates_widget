import { gql } from "apollo-server-express";

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

  type Exchange {
    id: ID
    dateTime: Date
    currencyFrom: String
    amount1: Float
    currencyTo: String
    amount2: Float
    type: PriceType
  }

  type Transaction {
    exchange: Exchange
    status: Status
  }

  type Query {
    getExchanges(input: QueryInput): [Exchange!]!
  }

  type Mutation {
    createExchange(input: CreateInput!): Transaction!
  }

  input CreateInput {
    currencyFrom: String!
    amount1: Float!
    currencyTo: String!
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

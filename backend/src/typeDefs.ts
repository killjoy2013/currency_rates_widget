import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  enum PriceType {
    Exchanged
    LivePrice
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

  type Query {
    getExchanges(
      startDate: Date
      endDate: Date
      currencyFrom: String
    ): [Exchange]
    # filterExchanges(dateTime: Date!): [Exchange]
  }

  type Mutation {
    createExchange(input: CreateInput!): Exchange
  }

  input CreateInput {
    currencyFrom: String!
    amount1: Float!
    currencyTo: String!
    amount2: Float!
    type: PriceType!
  }
`;

export default typeDefs;

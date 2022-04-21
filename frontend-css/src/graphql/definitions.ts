import gql from "graphql-tag";

const ALL_EXCHANGES = gql`
  query getAllExchanges {
    getAllExchanges {
      id
      dateTime
      currencyFrom
      amount1
      currencyTo
      amount2
      type
    }
  }
`;

export const Queries = {
  ALL_EXCHANGES,
};

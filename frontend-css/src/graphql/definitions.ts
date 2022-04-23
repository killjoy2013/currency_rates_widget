import gql from "graphql-tag";

const GET_EXCHANGES = gql`
  query getExchanges($input: QueryInput) {
    getExchanges(input: $input) {
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

const CREATE_EXCHANGE = gql`
  mutation createExchange($input: CreateInput!) {
    createExchange(input: $input) {
      exchange {
        id
        dateTime
        currencyFrom
        amount1
        currencyTo
        amount2
        type
      }
      status
    }
  }
`;

export const Queries = {
  GET_EXCHANGES,
};

export const Mutations = {
  CREATE_EXCHANGE,
};

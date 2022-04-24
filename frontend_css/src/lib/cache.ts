import { InMemoryCache, makeVar } from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getExchanges: {
          merge: (existing, incoming) => {
            return incoming;
          },
        },
      },
    },
  },
});

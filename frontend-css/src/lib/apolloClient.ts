import { ApolloClient, HttpLink, NormalizedCacheObject } from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { useMemo } from "react";
import { cache } from "./cache";

let apolloClient: ApolloClient<NormalizedCacheObject> | null;
type InitialState = NormalizedCacheObject | null;

function createApolloClient() {
  let uri =
    typeof window === "undefined"
      ? process.env.GRAPHQL_URL_SSR
      : process.env.NEXT_PUBLIC_GRAPHQL_URL_CLIENT;

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri,
    }),
    cache,
  });
}

export function initializeApollo(initialState: InitialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: InitialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@src/lib/apolloClient";
import type { AppProps } from "next/app";
import { FunctionComponent } from "react";
import "@styles/globals.css";

/*
_app.tsx runs on client side.
ApolloProvider is being populated and provided in top level context. 
So that we can obtain it everywhere using useApolloClient() hook
*/

const MyApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;

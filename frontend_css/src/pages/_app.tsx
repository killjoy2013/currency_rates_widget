import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@src/lib/apolloClient";
import type { AppProps } from "next/app";
import { FunctionComponent } from "react";
import "@styles/globals.css";

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

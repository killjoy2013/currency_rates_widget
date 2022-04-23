import React, { Suspense } from "react";
import Head from "next/head";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { UseQueryResult, useQuery, QueryClient } from "react-query";
import { dehydrate, DehydratedState } from "react-query/hydration";
import styles from "../../styles/Widget.module.css";
import DateFilter from "../components/DateFilter";
import ExchangeForm from "../components/ExchangeForm";
import ExchangeList from "../components/ExchangeList";
import {
  GetExchangesDocument,
  GetExchangesQuery,
  GetExchangesQueryVariables,
} from "@src/generated/graphql";
import graphqlRequestClient from "@src/lib/graphqlRequestClient";
import { initializeApollo } from "@src/lib/apolloClient";
import { Queries } from "@src/graphql/definitions";

const Home = () => {
  return (
    <Suspense fallback={<>Waiting...</>}>
      <main className={styles.main}>
        <header className={clsx(styles.container, styles.baseShadow)}>
          <div className={styles.toolbar}>
            <div className={styles.title}>Exchange</div>
            <ExchangeForm />
          </div>
        </header>

        <div className={styles.container}>
          <ExchangeList />
        </div>
      </main>
    </Suspense>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: Queries.GET_EXCHANGES,
    fetchPolicy: "network-only",
  });

  let normCache = apolloClient.cache.extract();

  return {
    props: {
      initialApolloState: normCache,
    },
  };
};
export default Home;

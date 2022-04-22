import React from "react";
import Head from "next/head";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { UseQueryResult, useQuery, QueryClient } from "react-query";
import { dehydrate, DehydratedState } from "react-query/hydration";
import styles from "../../styles/Widget.module.css";
import DateFilter from "../components/DateFilter";
import ExchangeForm from "../components/ExchangeForm";
import RateList from "../components/ExchangeList";
import {
  GetAllExchangesDocument,
  GetAllExchangesQuery,
  GetAllExchangesQueryVariables,
} from "@src/generated/graphql";
import graphqlRequestClient from "@src/lib/graphqlRequestClient";

const Home = () => {
  return (
    <>
      <main className={styles.main}>
        <header className={clsx(styles.container, styles.baseShadow)}>
          <div className={styles.toolbar}>
            <div className={styles.title}>Exchange</div>
            <ExchangeForm />
          </div>
        </header>

        <section className={styles.container}>
          <RateList />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { dehydratedState: DehydratedState };
}> => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("exchange-rates", async () => {
    return graphqlRequestClient.request<
      GetAllExchangesQuery,
      GetAllExchangesQueryVariables
    >(GetAllExchangesDocument, {});
  });

  console.log("query prefetched", queryClient);

  return { props: { dehydratedState: dehydrate(queryClient) } };
};
export default Home;

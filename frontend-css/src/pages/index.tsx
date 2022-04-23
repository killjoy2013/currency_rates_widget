import { Queries } from "@src/graphql/definitions";
import { initializeApollo } from "@src/lib/apolloClient";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import React, { Suspense } from "react";
import styles from "@styles/Widget.module.css";
import ExchangeForm from "@src/components/ExchangeForm";
import ExchangeList from "@src/components/ExchangeList";

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

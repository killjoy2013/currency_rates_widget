import React, { Suspense } from "react";
import ExchangeForm from "@src/components/ExchangeForm";
import ExchangeList from "@src/components/ExchangeList";
import { Queries } from "@src/graphql/definitions";
import { initializeApollo } from "@src/lib/apolloClient";
import styles from "@styles/Home.module.css";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { HandlerProvider } from "@src/contexts/HandlerContext";

const Home = () => {
  return (
    /*Adding suspense to create error boundary.
    Nest.js throws some UI hydration errors when inconsistent HTML found
    page will have two main componentsi ExchangeForm, ExchangeList
    */
    <Suspense fallback={<>Waiting...</>}>
      <HandlerProvider>
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
      </HandlerProvider>
    </Suspense>
  );
};

/*
getServerSideProps is where SSR magic hapens upon request
we're sending initial GraphQL request, from server to server
finally we're sending the created apollo cache to frontend in props.
We wouldn't need to send another GraphQL post request from client when page loads. This gives us high langing performance.
*/
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

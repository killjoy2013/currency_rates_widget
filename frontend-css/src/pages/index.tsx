import React from "react";
import Head from "next/head";
import clsx from "clsx";
import styles from "../../styles/Widget.module.css";
import DateFilter from "../components/DateFilter";
import ExchangeForm from "../components/ExchangeForm";
import RateList from "../components/RateList";

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

export async function getServerSideProps({ req }: { req: any }) {
  return { props: {} };
}

export default Home;

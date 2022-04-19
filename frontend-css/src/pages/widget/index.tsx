import React from "react";
import Head from "next/head";
import styles from "../../../styles/Widget.module.css";
import DateFilter from "../../components/DateFilter";
import ExchangeForm from "../../components/ExchangeForm";
import RateList from "../../components/RateList";

const Widget = () => {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.toolbar}>
          <div className={styles.title}>Exchange</div>
          <ExchangeForm />
        </div>

        <RateList />
      </div>
    </>
  );
};

export async function getServerSideProps({ req }: { req: any }) {
  return { props: {} };
}

export default Widget;

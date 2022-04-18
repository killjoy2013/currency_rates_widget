import React from "react";
import classes from "../../../styles/Widget.module.css";
import ExchangeForm from "../../components/ExchangeForm";
import RateList from "../../components/RateList";

const Widget = () => {
  return (
    <div className={classes.page}>
      <div className={classes.toolbar}>
        <div className={classes.title}>Exchange</div>
        <ExchangeForm />
      </div>
      <RateList />
    </div>
  );
};

export async function getServerSideProps({ req }: { req: any }) {
  return { props: {} };
}

export default Widget;

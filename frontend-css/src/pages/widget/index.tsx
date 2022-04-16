import React from "react";
import classes from "../../../styles/Widget.module.css";
import ExchangeForm from "../../components/ExchangeForm";

const Widget = () => {
  return (
    <div className={classes.page}>
      <div className={classes.toolbar}>
        <section className={classes.title}>Exchange</section>
        <ExchangeForm />
      </div>
      <div className={classes.main}>Main</div>
    </div>
  );
};

export default Widget;

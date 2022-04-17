import React from "react";
import classes from "../../../styles/Widget.module.css";
import ExchangeForm from "../../components/ExchangeForm";

const Widget = () => {
  return (
    <div className={classes.page}>
      <div className={classes.toolbar}>
        <div className={classes.title}>Exchange</div>
        <ExchangeForm />
      </div>
      <div className={classes.main}>Main</div>
    </div>
  );
};

export default Widget;

import React from "react";
import classes from "../../../styles/RateList.module.css";

const RateListMobile = () => {
  return (
    <div className={classes.mobile}>
      <div className={classes.titleSmall}>History</div>
      <div className={classes.box}>
        <div className={classes.upper}>
          <div className={classes.transaction}>
            <span>{`Bitcoin -> USD`}</span>
          </div>
          <div className={`${classes.indicator} ${classes.exchange}`} />
        </div>
        <div className={classes.lower}>
          <div className={classes.amount}>
            <span>Amount BTC 2.3466664</span>
          </div>
        </div>
      </div>
      <div className={classes.box}>
        <div className={classes.upper}>
          <div className={classes.transaction}>
            <span>{`Bitcoin -> USD`}</span>
          </div>
          <div className={`${classes.indicator} ${classes.live}`} />
        </div>
        <div className={classes.lower}>
          <div className={classes.amount}>
            <span>Amount BTC 2.3466664</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateListMobile;

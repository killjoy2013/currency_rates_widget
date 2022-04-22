import { Exchange } from "@src/generated/graphql";
import React, { FunctionComponent } from "react";
import classes from "@styles/ExchangeListMobile.module.css";
import DateFilter from "../DateFilter";

interface ExchangeListMobileProps {
  list: Exchange[];
}

const ExchangeListMobile: FunctionComponent<ExchangeListMobileProps> = ({
  list,
}) => {
  return (
    <div className={classes.mobile}>
      <div className={classes.titleSmall}>History</div>
      <DateFilter />

      <>
        {list.map((exchange, i) => (
          <div key={i} className={classes.box}>
            <div className={classes.upper}>
              <div className={classes.transaction}>
                <span>{`${exchange.currencyFrom} -> ${exchange.currencyTo}`}</span>
              </div>
              <div className={`${classes.indicator} ${classes.exchange}`} />
            </div>
            <div className={classes.lower}>
              <div className={classes.amount}>
                <span>{`Amount ${exchange.currencyFrom} ${exchange.amount1}`}</span>
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default ExchangeListMobile;

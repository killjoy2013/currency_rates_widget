import React, { FunctionComponent } from "react";
import { Exchange, PriceType } from "@src/generated/graphql";
import clsx from "clsx";
import styles from "@styles/ExchangeListMobile.module.css";
import genericStyles from "@styles/Generic.module.css";
import DateFilter from "../DateFilter";
import { useReactiveVar } from "@apollo/client";
import { listToDisplayVar } from "@src/lib/cache";

/*
mobile version has its own component.
we can't use table here. So, we design it only for mobile
visibility is set with media query in ExchangeListMobile.module.css (CSS module) of this component
*/

interface ExchangeListMobileProps {}

const ExchangeListMobile: FunctionComponent<ExchangeListMobileProps> = (
  props
) => {
  const listToDisplay = useReactiveVar(listToDisplayVar);
  return (
    <div className={styles.mobile}>
      <div className={styles.titleSmall}>History</div>
      <DateFilter />

      <>
        {
          //rendering as many item as the pagesize
          listToDisplay.map((exchange, i) => (
            <div key={i} className={styles.box}>
              <div className={styles.upper}>
                <div className={styles.transaction}>
                  <span>{`${exchange?.currencyFrom?.name} -> ${exchange?.currencyTo?.abbr}`}</span>
                </div>
                <div
                  className={clsx(
                    genericStyles.indicator,
                    exchange?.type == PriceType.Exchanged &&
                      genericStyles.exchangeIcon,
                    exchange?.type == PriceType.LivePrice &&
                      genericStyles.livePriceIcon
                  )}
                />
              </div>
              <div className={styles.lower}>
                <div className={styles.amount}>
                  <span>{`Amount ${exchange?.currencyFrom?.abbr} ${exchange?.amount1}`}</span>
                </div>
              </div>
            </div>
          ))
        }
      </>
    </div>
  );
};

export default ExchangeListMobile;

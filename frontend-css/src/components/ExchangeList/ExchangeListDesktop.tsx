import React, { useState, FunctionComponent } from "react";
import styles from "@styles/ExchangeListDesktop.module.css";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import DateFilter from "../DateFilter";
import Pagination from "../Pagination";
import { Exchange } from "@src/generated/graphql";
import moment from "moment";

interface ExchangeListDesktopProps {
  list: Array<Exchange | null>;
}

const ExchangeListDesktop: FunctionComponent<ExchangeListDesktopProps> = ({
  list,
}) => {
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  return (
    <div className={styles.desktop}>
      <div className={styles.titleSmall}>History</div>
      <DateFilter />
      <table className={styles.table}>
        <thead>
          <tr>
            <td
              className={`${styles.th} ${styles.sort}`}
              onClick={() => setSortAsc((prev) => !prev)}
            >
              {sortAsc ? <RiSortAsc /> : <RiSortDesc />}
              <span>Date & Time</span>
            </td>
            <td className={styles.th}>Currency From</td>
            <td className={styles.th}>Amount1</td>
            <td className={styles.th}>Currency To</td>
            <td className={styles.th}>Amount2</td>
            <td className={styles.th}>Type</td>
          </tr>
        </thead>
        <tbody>
          {list.map((exchange, i) => (
            <tr key={i} className={styles.tr}>
              <td className={styles.td}>
                {moment(exchange?.dateTime).format("DD/mm/yyyy HH:mm")}
              </td>
              <td className={styles.td}>{exchange?.currencyFrom}</td>
              <td className={styles.td}>{exchange?.amount1}</td>
              <td className={styles.td}>{exchange?.currencyTo}</td>
              <td className={styles.td}>{exchange?.amount2}</td>
              <td className={`${styles.td} ${styles.livePrice}`}>
                {exchange?.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalNumber={6}
        onPageChange={(page) => console.log({ page })}
      />
    </div>
  );
};

export default ExchangeListDesktop;

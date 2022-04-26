import React, { useState, FunctionComponent, useContext } from "react";
import styles from "@styles/ExchangeListDesktop.module.css";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import DateFilter from "../DateFilter";
import Pagination from "../Pagination";
import { Exchange, PriceType } from "@src/generated/graphql";
import moment from "moment";
import { formatNumber } from "@src/helpers/TextHelpers";
import clsx from "clsx";
import { HandlerContext } from "@src/contexts/HandlerContext";
import { filterFormDataVar } from "@src/lib/cache";

/*
This component will be visible only above 1200px, for desktops
with media query in ExchangeListDesktop.module.css
*/

interface ExchangeListDesktopProps {
  list: Array<Exchange | null>;
}

/*
Every <td> tag in the table <thead> part contains a funtionality.
So, it's better to create a component and reuse it
*/
interface ITd {
  name: keyof Exchange;
  sortAsc: boolean;
  sorting: boolean;
  label: string;
  onClick: (name: keyof Exchange) => void;
}
const Td: React.FC<ITd> = ({ name, sorting, sortAsc, label, onClick }) => {
  return (
    <td
      key={name}
      className={clsx(styles.th, sorting && styles.sort)}
      onClick={onClick.bind(null, name)}
    >
      {sorting && (sortAsc ? <RiSortAsc /> : <RiSortDesc />)}
      <span>{label}</span>
    </td>
  );
};

const ExchangeListDesktop: FunctionComponent<ExchangeListDesktopProps> = ({
  list,
}) => {
  /*
  we need to keep sort direction and sort field data in local state.
  should be re-rendered when they are changed
  */
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [sortField, setSortField] = useState<keyof Exchange>("dateTime");

  const { sortList, queryHandler } = useContext(HandlerContext);

  const sortListHandler = (name: keyof Exchange) => {
    sortList(name, !sortAsc);
    setSortAsc((prev) => !prev);
    setSortField(name);
  };

  return (
    <div className={styles.desktop}>
      <div className={styles.titleSmall}>History</div>
      <DateFilter />
      <table className={styles.table}>
        <thead>
          <tr>
            <Td
              name="dateTime"
              label="Date & Time"
              sorting={sortField == "dateTime"}
              sortAsc={sortAsc}
              onClick={sortListHandler}
            ></Td>
            <Td
              name="currencyFrom"
              label="Currency From"
              sorting={sortField == "currencyFrom"}
              sortAsc={sortAsc}
              onClick={sortListHandler}
            ></Td>
            <Td
              name="amount1"
              label="Amount1"
              sorting={sortField == "amount1"}
              sortAsc={sortAsc}
              onClick={sortListHandler}
            ></Td>
            <Td
              name="currencyTo"
              label="Currency To"
              sorting={sortField == "currencyTo"}
              sortAsc={sortAsc}
              onClick={sortListHandler}
            ></Td>
            <Td
              name="amount2"
              label="Amount2"
              sorting={sortField == "amount2"}
              sortAsc={sortAsc}
              onClick={sortListHandler}
            ></Td>
            <Td
              name="type"
              label="Type"
              sorting={sortField == "type"}
              sortAsc={sortAsc}
              onClick={sortListHandler}
            ></Td>
          </tr>
        </thead>
        <tbody>
          {
            //rendering as many item as the pagesize
            list
              .slice(0, parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE as string))
              .map((exchange, i) => (
                <tr key={i} className={styles.tr}>
                  <td className={styles.td}>
                    {moment(exchange?.dateTime).format("DD/MM/yyyy HH:mm")}
                  </td>
                  <td className={styles.td}>{exchange?.currencyFrom?.abbr}</td>
                  <td className={styles.td}>
                    {formatNumber(exchange?.amount1, 2)}
                  </td>
                  <td className={styles.td}>{exchange?.currencyTo?.name}</td>
                  <td className={clsx(styles.td, styles.number)}>
                    {formatNumber(exchange?.amount2, 2)}
                  </td>
                  <td
                    className={clsx(
                      styles.td,
                      exchange?.type == PriceType.Exchanged && styles.exchange,
                      exchange?.type == PriceType.LivePrice && styles.livePrice
                    )}
                  >
                    {exchange?.type}
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <Pagination totalNumber={6} onPageChange={queryHandler} />
    </div>
  );
};

export default ExchangeListDesktop;
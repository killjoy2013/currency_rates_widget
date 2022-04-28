import React, { useState, FunctionComponent, useContext } from "react";
import styles from "@styles/ExchangeListDesktop.module.css";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import DateFilter from "../DateFilter";
import Pagination from "../Pagination";
import { Exchange, PriceType, CurrencyItemType } from "@src/generated/graphql";
import moment from "moment";
import { formatNumber } from "@src/helpers/TextHelpers";
import clsx from "clsx";
import { HandlerContext } from "@src/contexts/HandlerContext";
import { filterFormDataVar, listToDisplayVar } from "@src/lib/cache";
import { useReactiveVar } from "@apollo/client";

/*
This component will be visible only above 1200px, for desktops
with media query in ExchangeListDesktop.module.css
*/

interface ExchangeListDesktopProps {}

/*
Every <td> tag in the table <thead> part contains a funtionality.
So, it's better to create a component and reuse it
*/
interface ITd<T> {
  columnField?: keyof T | undefined;
  columnName: keyof Exchange;
  sortAsc: boolean;
  sorting: boolean;
  label: string;
  onClick: <T>(
    columnField: keyof T | undefined,
    columnName: keyof Exchange
  ) => void;
}
function Td<T>(props: ITd<T>) {
  const { columnField, columnName, sorting, sortAsc, label, onClick } = props;

  return (
    <td
      key={columnName}
      className={clsx(styles.th)}
      onClick={() => onClick(columnField, columnName)}
    >
      <div className={styles.sort}>
        {sorting && (sortAsc ? <RiSortAsc /> : <RiSortDesc />)}
        <span>{label}</span>
      </div>
    </td>
  );
}

const ExchangeListDesktop: FunctionComponent<ExchangeListDesktopProps> = (
  props
) => {
  /*
  we need to keep sort direction and sort field data in local state.
  should be re-rendered when they are changed
  */
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [sortField, setSortField] = useState<keyof Exchange>("dateTime");
  const listToDisplay = useReactiveVar(listToDisplayVar);

  const { sortList, queryExchange } = useContext(HandlerContext);

  const sortListHandler = <TColumn,>(
    columnField: keyof TColumn | undefined,
    columnName: keyof Exchange
  ) => {
    sortList<TColumn>(columnField, columnName, !sortAsc);
    setSortAsc((prev) => !prev);
    setSortField(columnName);
  };

  const queryHandler = (pageNumber: number) => {
    filterFormDataVar({ ...filterFormDataVar(), pageNumber });
    queryExchange();
  };

  return (
    <div className={styles.desktop}>
      <div className={styles.titleSmall}>History</div>
      <DateFilter />
      <table className={styles.table}>
        <thead>
          <tr>
            <Td<string>
              columnName="dateTime"
              label="Date & Time"
              sorting={sortField == "dateTime"}
              sortAsc={sortAsc}
              onClick={sortListHandler}
            ></Td>
            <Td<CurrencyItemType>
              columnName="currencyFrom"
              columnField="abbr"
              label="Currency From"
              sorting={sortField == "currencyFrom"}
              sortAsc={sortAsc}
              onClick={sortListHandler}
            ></Td>
            <Td<number>
              columnName="amount1"
              label="Amount1"
              sorting={sortField == "amount1"}
              sortAsc={sortAsc}
              onClick={sortListHandler}
            ></Td>
            <Td<CurrencyItemType>
              columnName="currencyTo"
              columnField="name"
              label="Currency To"
              sorting={sortField == "currencyTo"}
              sortAsc={sortAsc}
              onClick={sortListHandler}
            ></Td>
            <Td<number>
              columnName="amount2"
              label="Amount2"
              sorting={sortField == "amount2"}
              sortAsc={sortAsc}
              onClick={sortListHandler}
            ></Td>
            <Td<PriceType>
              columnName="type"
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
            listToDisplay.map((exchange, i) => (
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

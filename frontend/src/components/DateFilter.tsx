import React, { useContext } from "react";
import { useApolloClient, useReactiveVar } from "@apollo/client";
import {
  GetExchangesQuery,
  GetExchangesQueryVariables,
  PriceType,
  QueryInput,
} from "@src/generated/graphql";
import { Queries } from "@src/graphql/definitions";
import { useState } from "react";
import styles from "../../styles/DateFilter.module.css";
import Button from "../elements/Button";
import CustomDatePicker from "../elements/CustomDatePicker";
import DropDown from "../elements/DropDown";
import { filterFormDataVar } from "@src/lib/cache";
import { HandlerContext } from "@src/contexts/HandlerContext";

const DateFilter = () => {
  const client = useApolloClient();
  const filterFormData = useReactiveVar(filterFormDataVar);
  const { queryHandler } = useContext(HandlerContext);

  // const queryHandler = async () => {
  //   let filteredData = await client.query<
  //     GetExchangesQuery,
  //     GetExchangesQueryVariables
  //   >({
  //     query: Queries.GET_EXCHANGES,
  //     fetchPolicy: "network-only",
  //     variables: {
  //       input: { ...filterFormDataVar() },
  //     },
  //   });

  //   client.writeQuery<GetExchangesQuery, GetExchangesQueryVariables>({
  //     query: Queries.GET_EXCHANGES,
  //     data: filteredData.data,
  //     variables: {}, //todo
  //   });
  // };

  const TypeRow = ({ data }: { data: string }) => <div>{`${data}`}</div>;
  const TypeSelect = ({ data }: { data: string }) => <div>{`${data}`}</div>;

  return (
    <div className={styles.container}>
      <CustomDatePicker
        name="fromDate"
        value={filterFormData.fromDate}
        label="From date"
        onChange={({ value }) =>
          filterFormDataVar({
            ...filterFormDataVar(),
            fromDate: new Date(
              value.getFullYear(),
              value.getMonth(),
              value.getDate(),
              0,
              0,
              0,
              0
            ),
          })
        }
      />
      <CustomDatePicker
        name="toDate"
        value={filterFormData.toDate}
        label="To date"
        onChange={({ value }) =>
          filterFormDataVar({
            ...filterFormDataVar(),
            toDate: new Date(
              value.getFullYear(),
              value.getMonth(),
              value.getDate(),
              0,
              0,
              0,
              0
            ),
          })
        }
      />
      <DropDown<PriceType>
        className={styles.type}
        name="type"
        Row={TypeRow}
        Selected={TypeSelect}
        value={filterFormData.type as PriceType}
        label="Type"
        items={[PriceType.All, PriceType.Exchanged, PriceType.LivePrice]}
        onChange={(type) =>
          filterFormDataVar({ ...filterFormDataVar(), type: type })
        }
      />
      <Button label="Filter" variant="outlined" onClick={queryHandler} />
    </div>
  );
};

export default DateFilter;

import React from "react";
import { useApolloClient } from "@apollo/client";
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

const DateFilter = () => {
  const [formData, setFormData] = useState<QueryInput>({
    fromDate: new Date(),
    toDate: new Date(),
    type: PriceType.All,
  });

  const client = useApolloClient();

  const queryHandler = async () => {
    let filteredData = await client.query<
      GetExchangesQuery,
      GetExchangesQueryVariables
    >({
      query: Queries.GET_EXCHANGES,
      fetchPolicy: "network-only",
      variables: {
        input: { ...formData },
      },
    });

    client.writeQuery<GetExchangesQuery, GetExchangesQueryVariables>({
      query: Queries.GET_EXCHANGES,
      data: filteredData.data,
      variables: {}, //todo
    });
  };

  const TypeRow = ({ data }: { data: string }) => <div>{`${data}`}</div>;
  const TypeSelect = ({ data }: { data: string }) => <div>{`${data}`}</div>;

  return (
    <div className={styles.container}>
      <CustomDatePicker
        name="fromDate"
        value={formData?.fromDate}
        label="From date"
        onChange={({ value }) => {
          setFormData((prev) => ({ ...prev, fromDate: value }));
          console.log({ value });
        }}
      />
      <CustomDatePicker
        name="toDate"
        value={formData?.toDate}
        label="To date"
        onChange={({ value }) =>
          setFormData((prev) => ({ ...prev, toDate: value }))
        }
      />
      <DropDown<PriceType>
        className={styles.type}
        name="type"
        Row={TypeRow}
        Selected={TypeSelect}
        value={formData.type as PriceType}
        label="Type"
        items={[PriceType.All, PriceType.Exchanged, PriceType.LivePrice]}
        onChange={(type) => setFormData((prev) => ({ ...prev, type }))}
      />
      <Button
        label="Filter"
        variant="outlined"
        onClick={() => queryHandler()}
      />
      {/* <Button label="setcachee" variant="outlined" onClick={async () => {}} /> */}
    </div>
  );
};

export default DateFilter;

import CustomDatePicker from "../elements/CustomDatePicker";
import styles from "../../styles/DateFilter.module.css";
import { useState } from "react";
import DropDown from "../elements/DropDown";
import Button from "../elements/Button";
import {
  Exchange,
  GetExchangesDocument,
  GetExchangesQuery,
  GetExchangesQueryVariables,
} from "@src/generated/graphql";
import graphqlRequestClient from "@src/lib/graphqlRequestClient";
import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";
import { useEffect } from "react";

type FormData = {
  fromDate: Date;
  toDate: Date;
  type: "All" | "Exchanged" | "Live Price";
};

const DateFilter = () => {
  const [formData, setFormData] = useState<FormData>({
    fromDate: new Date(),
    toDate: new Date(),
    type: "All",
  });

  const { data, error, isError, isLoading, refetch, isFetching } = useQuery<
    GetExchangesQuery,
    Error,
    Exchange[]
  >(
    "exchange-rates",
    async () => {
      return graphqlRequestClient.request<
        GetExchangesQuery,
        GetExchangesQueryVariables
      >(GetExchangesDocument, {
        currencyFrom: "BTC",
      });
    },
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  // const { data, error, isError, isLoading, refetch, isFetching } =
  //   useFilterExchangesQuery<FilterExchangesQuery, Error>(
  //     graphqlRequestClient,
  //     {
  //       dateTime: formData.fromDate,
  //     },
  //     {
  //       enabled: false,
  //       onError: () => {
  //         console.log("refetch error");
  //       },
  //       onSuccess: () => {
  //         console.log("refetch success");
  //       },
  //     }
  //   );

  useEffect(() => {
    data &&
      console.log({
        data,
        fromDate: formData.fromDate,
        isLoading,
        isFetching,
        isError,
        error,
      });
  }, [!!data]);

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
      <DropDown<"All" | "Exchanged" | "Live Price">
        className={styles.type}
        name="type"
        Row={TypeRow}
        Selected={TypeSelect}
        value={formData.type}
        label="Type"
        items={["All", "Exchanged", "Live Price"]}
        onChange={(type) => setFormData((prev) => ({ ...prev, type }))}
      />
      <Button
        label="Filter"
        variant="outlined"
        onClick={async () => {
          let dell = await refetch();
          console.log("refetch", dell);
        }}
      />
    </div>
  );
};

export default DateFilter;

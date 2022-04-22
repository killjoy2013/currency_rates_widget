import CustomDatePicker from "../elements/CustomDatePicker";
import styles from "../../styles/DateFilter.module.css";
import { useState } from "react";
import DropDown from "../elements/DropDown";
import Button from "../elements/Button";
import {
  FilterExchangesQuery,
  useFilterExchangesQuery,
} from "@src/generated/graphql";
import graphqlRequestClient from "@src/lib/graphqlRequestClient";

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

  const { data, error, isError, isLoading, refetch, isFetching } =
    useFilterExchangesQuery<FilterExchangesQuery, Error>(
      graphqlRequestClient,
      {
        dateTime: formData.fromDate,
      },
      {
        enabled: false,
        onError: () => {
          console.log("refetch error");
        },
        onSuccess: () => {
          console.log("refetch success");
        },
      }
    );

  console.log({
    data,
    fromDate: formData.fromDate,
    isLoading,
    isFetching,
    isError,
    error,
  });

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
        onClick={() => {
          () => refetch();
        }}
      />
    </div>
  );
};

export default DateFilter;

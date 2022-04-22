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
  PriceType,
} from "@src/generated/graphql";
import graphqlRequestClient from "@src/lib/graphqlRequestClient";
import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

type FormData = {
  fromDate: Date;
  toDate: Date;
  type: PriceType;
};

const DateFilter = () => {
  const [formData, setFormData] = useState<FormData>({
    fromDate: new Date(),
    toDate: new Date(),
    type: PriceType.All,
  });

  const queryClient = useQueryClient();

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
        startDate: formData.fromDate,
        endDate: formData.toDate,
        type: formData.type,
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
      <DropDown<PriceType>
        className={styles.type}
        name="type"
        Row={TypeRow}
        Selected={TypeSelect}
        value={formData.type}
        label="Type"
        items={[PriceType.All, PriceType.Exchanged, PriceType.LivePrice]}
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
      <Button
        label="setcachee"
        variant="outlined"
        onClick={async () => {
          queryClient.setQueryData("exchange-rates", (old: any) => {
            console.log({ old });

            const { getExchanges } = old;

            console.log({ getExchanges });

            // const {
            //   data: { getExchanges },
            // } = old;

            // console.log({ getExchanges });

            // let newData: Array<Exchange> = [...data];

            let newOne: Exchange = {
              amount1: 99,
              amount2: 88,
              currencyFrom: "Bitcoin",
              currencyTo: "USD",
              dateTime: "2022-04-22 19:19",
              type: PriceType.Exchanged,
            };

            return {
              getExchanges: [newOne, ...getExchanges],
            };
          });

          // queryClient.setQueryData("exchange-rates", (data) => {
          //   console.log({ data });

          //   return {
          //     data: {},
          //   };
          // });
        }}
      />
    </div>
  );
};

export default DateFilter;

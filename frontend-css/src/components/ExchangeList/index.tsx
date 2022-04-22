import React from "react";
import { GetServerSideProps } from "next";
import { UseQueryResult, useQuery, QueryClient } from "react-query";
import { dehydrate, DehydratedState } from "react-query/hydration";
import RateListDesktop from "./ExchangeListDesktop";
import RateListMobile from "./RateListMobile";
import {
  Exchange,
  GetExchangesDocument,
  GetExchangesQuery,
  useGetExchangesQuery,
} from "@src/generated/graphql";
import graphqlRequestClient from "src/lib/graphqlRequestClient";
import { useEffect } from "react";
import { GraphQLResponse } from "graphql-request/dist/types";

const RateList = () => {
  //good
  const { data, error, isLoading, refetch } = useQuery<
    GraphQLResponse,
    Error,
    GraphQLResponse<GetExchangesQuery>
  >(
    "exchange-rates",
    async () => {
      return graphqlRequestClient.request(GetExchangesDocument);
    },
    {
      enabled: true,
    }
  );

  //codegen ???
  // const { data, error, isLoading, refetch } = useGetAllExchangesQuery<
  //   GetAllExchangesQuery,
  //   Error
  // >(
  //   graphqlRequestClient,
  //   {},
  //   {
  //     queryKey: "exchange-rates",
  //   }
  // );

  useEffect(() => {
    data && console.log({ data });
  }, [!!data]);

  useEffect(() => {
    console.count("Exchange list rendered - ");
  });

  return (
    <>
      {data?.getExchanges && (
        <>
          <RateListDesktop list={data?.getExchanges as Exchange[]} />
          <RateListMobile list={data?.getExchanges as Exchange[]} />
        </>
      )}
      {error && <>Error :-(</>}
      {isLoading && <>Loading...</>}
    </>
  );
};

export default RateList;

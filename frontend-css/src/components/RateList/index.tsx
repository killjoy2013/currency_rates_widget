import React from "react";
import RateListDesktop from "./RateListDesktop";
import RateListMobile from "./RateListMobile";
import {
  GetAllExchangesQuery,
  useGetAllExchangesQuery,
} from "@src/generated/graphql";
import graphqlRequestClient from "src/lib/graphqlRequestClient";
import { useEffect } from "react";

const RateList = () => {
  const { data, error, isLoading } = useGetAllExchangesQuery<
    GetAllExchangesQuery,
    Error
  >(graphqlRequestClient, {});

  useEffect(() => {
    data && console.log({ data });
  }, [!!data]);

  return (
    <>
      {/* {data?.getAllExchanges && ( */}
      <>
        <RateListDesktop />
        <RateListMobile />
      </>
      {/* )}
      {error && <>Error :-(</>}
      {isLoading && <>Loading...</>} */}
    </>
  );
};

export default RateList;

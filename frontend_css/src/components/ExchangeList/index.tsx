import React from "react";
import { useGetExchangesQuery } from "@src/generated/graphql";
import RateListDesktop from "./ExchangeListDesktop";
import RateListMobile from "./ExchangeListMobile";

const ExchangeList = () => {
  const { data, error, loading } = useGetExchangesQuery();

  return (
    <>
      {data?.getExchanges && (
        <>
          <RateListDesktop list={data.getExchanges} />
          <RateListMobile list={data.getExchanges} />
        </>
      )}
      {error && <>Error :-(</>}
      {loading && <>Loading...</>}
    </>
  );
};

export default ExchangeList;

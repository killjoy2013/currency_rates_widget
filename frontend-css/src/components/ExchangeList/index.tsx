import { useGetExchangesQuery } from "@src/generated/graphql";
import React from "react";
import RateListDesktop from "./ExchangeListDesktop";
import RateListMobile from "./RateListMobile";

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

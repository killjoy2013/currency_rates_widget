import React from "react";
import { useGetExchangesQuery } from "@src/generated/graphql";
import RateListDesktop from "./ExchangeListDesktop";
import RateListMobile from "./ExchangeListMobile";

/*
ExchangeList is a top level component which creates the table in the page
it has no props, just populates the content with data
*/

const ExchangeList = () => {
  /*
  useGetExchangesQuery hook is created by GraphQL code generator.
  instead of getting the Apollo Client and sending a string based query,
  we use this generated query hook. Much cleaner and type safe.
  Rendering of mobile or desktop version is decided with media queries
  */
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

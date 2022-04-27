import React, { useEffect } from "react";
import { useGetExchangesQuery } from "@src/generated/graphql";
import RateListDesktop from "./ExchangeListDesktop";
import RateListMobile from "./ExchangeListMobile";
import { filterFormDataVar, listToDisplayVar } from "@src/lib/cache";

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

  console.log({
    pageSize: parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE as string),
  });

  const { data, error, loading } = useGetExchangesQuery({
    variables: {
      input: {
        ...filterFormDataVar(),
      },
    },
  });

  useEffect(() => {
    data?.getExchanges && listToDisplayVar([...data.getExchanges]);
  }, [!!data]);

  return (
    <>
      <RateListDesktop />
      <RateListMobile />
    </>
  );
};

export default ExchangeList;

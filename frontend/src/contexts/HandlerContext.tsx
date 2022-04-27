import React, { createContext, useEffect, useRef } from "react";
import { useApolloClient } from "@apollo/client";
import {
  Exchange,
  GetExchangesQuery,
  GetExchangesQueryVariables,
} from "@src/generated/graphql";
import { Queries } from "@src/graphql/definitions";
import { io, Socket } from "socket.io-client";
import { FAKE_EXCHANGE_CREATED } from "@src/constants";
import {
  filterFormDataVar,
  latestRatesVar,
  listToDisplayVar,
} from "@src/lib/cache";

/*
Reactjs context is a wonderful place to put our functions that other components need to access.
this way, we avoid prop drilling no metter where the component is in the component tree.
*/

interface IHandlerContext {
  sortList: (field: keyof Exchange, sortAsc: boolean) => void;
  queryExchange: () => void;
}

const defaultState = {
  sortList: (field: keyof Exchange, sortAsc: boolean) => {},
  queryExchange: () => {},
};

const HandlerContext = createContext<IHandlerContext>(defaultState);

interface IHandlerProvider {
  children?: any;
}

const HandlerProvider: React.FC<IHandlerProvider> = ({ children }) => {
  const client = useApolloClient();

  //websocket setup is done here as well
  const socketRef = useRef<Socket>();
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(
        process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL as string,
        {
          reconnection: true,
        }
      );

      socketRef.current.on("connect", () => {
        console.log("a user connected");
      });

      socketRef.current.on("disconnect", () => {
        console.log("disconnected");
      });

      socketRef.current.on(FAKE_EXCHANGE_CREATED, ({ exchanges }) => {
        console.log({ exchanges });
        listToDisplayVar(exchanges.slice(0, 7));
        latestRatesVar(exchanges);
      });
    }
  }, [socketRef.current]);

  const sortList = (field: keyof Exchange, sortAsc: boolean) => {
    listToDisplayVar([
      ...listToDisplayVar().sort((a, b) => {
        if (sortAsc) {
          if (a[field] < b[field]) {
            return -1;
          } else if (a[field] < b[field]) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (a[field] > b[field]) {
            return -1;
          } else if (a[field] < b[field]) {
            return 1;
          } else {
            return 0;
          }
        }
      }),
    ]);
  };

  const queryExchange = async () => {
    let { data } = await client.query<
      GetExchangesQuery,
      GetExchangesQueryVariables
    >({
      query: Queries.GET_EXCHANGES,
      fetchPolicy: "network-only",
      variables: {
        input: { ...filterFormDataVar() },
      },
    });
    listToDisplayVar([...data.getExchanges]);
  };

  return (
    <HandlerContext.Provider
      value={{
        sortList,
        queryExchange,
      }}
    >
      {children}
    </HandlerContext.Provider>
  );
};

export { HandlerContext, HandlerProvider };

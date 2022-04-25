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
import { filterFormDataVar, latestRatesVar } from "@src/lib/cache";

interface IHandlerContext {
  addExchangeToCache: (exchanges: Array<Exchange>) => void;
  sortList: (field: keyof Exchange, sortAsc: boolean) => void;
  queryHandler: () => void;
}

const defaultState = {
  addExchangeToCache: (exchanges: Array<Exchange>) => {},
  sortList: (field: keyof Exchange, sortAsc: boolean) => {},
  queryHandler: () => {},
};

const HandlerContext = createContext<IHandlerContext>(defaultState);

interface IHandlerProvider {
  children?: any;
}

const HandlerProvider: React.FC<IHandlerProvider> = ({ children }) => {
  const client = useApolloClient();
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
        addExchangeToCache(exchanges);
      });
    }
  }, [socketRef.current]);

  const addExchangeToCache = (exchanges: Array<Exchange>) => {
    const { getExchanges: originalData } = client.readQuery<
      GetExchangesQuery,
      GetExchangesQueryVariables
    >({
      query: Queries.GET_EXCHANGES,
      variables: {}, //todo
    }) as GetExchangesQuery;

    let newExchanges = [...exchanges, ...originalData];

    client.writeQuery<GetExchangesQuery, GetExchangesQueryVariables>({
      query: Queries.GET_EXCHANGES,
      data: {
        getExchanges: newExchanges,
      },
      variables: {},
    });

    latestRatesVar(exchanges);
  };

  const sortList = (field: keyof Exchange, sortAsc: boolean) => {
    const { getExchanges: originalData } = client.readQuery<
      GetExchangesQuery,
      GetExchangesQueryVariables
    >({
      query: Queries.GET_EXCHANGES,
      variables: {}, //todo
    }) as GetExchangesQuery;

    client.writeQuery<GetExchangesQuery, GetExchangesQueryVariables>({
      query: Queries.GET_EXCHANGES,
      data: {
        getExchanges: [...originalData].sort((a, b) => {
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
      },
      variables: {},
    });
  };

  const queryHandler = async () => {
    let filteredData = await client.query<
      GetExchangesQuery,
      GetExchangesQueryVariables
    >({
      query: Queries.GET_EXCHANGES,
      fetchPolicy: "network-only",
      variables: {
        input: { ...filterFormDataVar() },
      },
    });

    client.writeQuery<GetExchangesQuery, GetExchangesQueryVariables>({
      query: Queries.GET_EXCHANGES,
      data: filteredData.data,
      variables: {},
    });
  };

  return (
    <HandlerContext.Provider
      value={{
        addExchangeToCache,
        sortList,
        queryHandler,
      }}
    >
      {children}
    </HandlerContext.Provider>
  );
};

export { HandlerContext, HandlerProvider };

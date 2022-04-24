import React, { createContext, useEffect, useRef } from "react";
import { useApolloClient } from "@apollo/client";
import {
  Exchange,
  GetExchangesQuery,
  GetExchangesQueryVariables,
} from "@src/generated/graphql";
import { Queries } from "@src/graphql/definitions";
import { io, Socket } from "socket.io-client";

interface IHandlerContext {
  addExchangeToCache: (exchanges: Array<Exchange>) => void;
  sortList: (field: keyof Exchange, sortAsc: boolean) => void;
}

const defaultState = {
  addExchangeToCache: (exchanges: Array<Exchange>) => {},
  sortList: (field: keyof Exchange, sortAsc: boolean) => {},
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
      socketRef.current = io("http://localhost:4000", {
        reconnection: true,
      });

      socketRef.current.on("connect", () => {
        console.log("a user connected");
      });

      socketRef.current.on("disconnect", () => {
        console.log("disconnected");
      });

      socketRef.current.on("FAKE_EXCHANGE_CREATED", ({ exchanges }) => {
        console.log(exchanges);
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

    client.writeQuery<GetExchangesQuery, GetExchangesQueryVariables>({
      query: Queries.GET_EXCHANGES,
      data: {
        getExchanges: [...exchanges, ...originalData],
      },
      variables: {},
    });
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

  return (
    <HandlerContext.Provider
      value={{
        addExchangeToCache,
        sortList,
      }}
    >
      {children}
    </HandlerContext.Provider>
  );
};

export { HandlerContext, HandlerProvider };

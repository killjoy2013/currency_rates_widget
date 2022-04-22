import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type CreateInput = {
  amount1: Scalars['Float'];
  amount2: Scalars['Float'];
  currencyFrom: Scalars['String'];
  currencyTo: Scalars['String'];
  type: PriceType;
};

export type Exchange = {
  __typename?: 'Exchange';
  amount1?: Maybe<Scalars['Float']>;
  amount2?: Maybe<Scalars['Float']>;
  currencyFrom?: Maybe<Scalars['String']>;
  currencyTo?: Maybe<Scalars['String']>;
  dateTime?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<PriceType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createExchange?: Maybe<Exchange>;
};


export type MutationCreateExchangeArgs = {
  input: CreateInput;
};

export enum PriceType {
  Exchanged = 'Exchanged',
  LivePrice = 'LivePrice'
}

export type Query = {
  __typename?: 'Query';
  filterExchanges?: Maybe<Array<Maybe<Exchange>>>;
  getAllExchanges?: Maybe<Array<Maybe<Exchange>>>;
};


export type QueryFilterExchangesArgs = {
  dateTime: Scalars['Date'];
};

export type FilterExchangesQueryVariables = Exact<{
  dateTime: Scalars['Date'];
}>;


export type FilterExchangesQuery = { __typename?: 'Query', filterExchanges?: Array<{ __typename?: 'Exchange', id?: string | null, dateTime?: any | null, currencyFrom?: string | null, amount1?: number | null, currencyTo?: string | null, amount2?: number | null, type?: PriceType | null } | null> | null };

export type GetAllExchangesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExchangesQuery = { __typename?: 'Query', getAllExchanges?: Array<{ __typename?: 'Exchange', id?: string | null, dateTime?: any | null, currencyFrom?: string | null, amount1?: number | null, currencyTo?: string | null, amount2?: number | null, type?: PriceType | null } | null> | null };


export const FilterExchangesDocument = `
    query filterExchanges($dateTime: Date!) {
  filterExchanges(dateTime: $dateTime) {
    id
    dateTime
    currencyFrom
    amount1
    currencyTo
    amount2
    type
  }
}
    `;
export const useFilterExchangesQuery = <
      TData = FilterExchangesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FilterExchangesQueryVariables,
      options?: UseQueryOptions<FilterExchangesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FilterExchangesQuery, TError, TData>(
      ['filterExchanges', variables],
      fetcher<FilterExchangesQuery, FilterExchangesQueryVariables>(client, FilterExchangesDocument, variables, headers),
      options
    );
export const GetAllExchangesDocument = `
    query getAllExchanges {
  getAllExchanges {
    id
    dateTime
    currencyFrom
    amount1
    currencyTo
    amount2
    type
  }
}
    `;
export const useGetAllExchangesQuery = <
      TData = GetAllExchangesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAllExchangesQueryVariables,
      options?: UseQueryOptions<GetAllExchangesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllExchangesQuery, TError, TData>(
      variables === undefined ? ['getAllExchanges'] : ['getAllExchanges', variables],
      fetcher<GetAllExchangesQuery, GetAllExchangesQueryVariables>(client, GetAllExchangesDocument, variables, headers),
      options
    );
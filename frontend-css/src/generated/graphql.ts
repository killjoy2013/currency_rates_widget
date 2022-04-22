import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
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
  All = 'All',
  Exchanged = 'Exchanged',
  LivePrice = 'LivePrice'
}

export type Query = {
  __typename?: 'Query';
  getExchanges?: Maybe<Array<Maybe<Exchange>>>;
};


export type QueryGetExchangesArgs = {
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
  type?: InputMaybe<PriceType>;
};

export type CreateExchangeMutationVariables = Exact<{
  input: CreateInput;
}>;


export type CreateExchangeMutation = { __typename?: 'Mutation', createExchange?: { __typename?: 'Exchange', id?: string | null, dateTime?: any | null, currencyFrom?: string | null, amount1?: number | null, currencyTo?: string | null, amount2?: number | null, type?: PriceType | null } | null };

export type GetExchangesQueryVariables = Exact<{
  startDate?: InputMaybe<Scalars['Date']>;
  endDate?: InputMaybe<Scalars['Date']>;
  type?: InputMaybe<PriceType>;
}>;


export type GetExchangesQuery = { __typename?: 'Query', getExchanges?: Array<{ __typename?: 'Exchange', id?: string | null, dateTime?: any | null, currencyFrom?: string | null, amount1?: number | null, currencyTo?: string | null, amount2?: number | null, type?: PriceType | null } | null> | null };


export const CreateExchangeDocument = `
    mutation createExchange($input: CreateInput!) {
  createExchange(input: $input) {
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
export const useCreateExchangeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateExchangeMutation, TError, CreateExchangeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateExchangeMutation, TError, CreateExchangeMutationVariables, TContext>(
      ['createExchange'],
      (variables?: CreateExchangeMutationVariables) => fetcher<CreateExchangeMutation, CreateExchangeMutationVariables>(client, CreateExchangeDocument, variables, headers)(),
      options
    );
export const GetExchangesDocument = `
    query getExchanges($startDate: Date, $endDate: Date, $type: PriceType) {
  getExchanges(startDate: $startDate, endDate: $endDate, type: $type) {
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
export const useGetExchangesQuery = <
      TData = GetExchangesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetExchangesQueryVariables,
      options?: UseQueryOptions<GetExchangesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetExchangesQuery, TError, TData>(
      variables === undefined ? ['getExchanges'] : ['getExchanges', variables],
      fetcher<GetExchangesQuery, GetExchangesQueryVariables>(client, GetExchangesDocument, variables, headers),
      options
    );
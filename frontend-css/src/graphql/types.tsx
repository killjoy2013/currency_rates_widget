/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
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

export type GetAllExchangesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExchangesQuery = { __typename?: 'Query', getAllExchanges?: Array<{ __typename?: 'Exchange', id?: string | null, dateTime?: any | null, currencyFrom?: string | null, amount1?: number | null, currencyTo?: string | null, amount2?: number | null, type?: PriceType | null } | null> | null };


export const GetAllExchangesDocument = gql`
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

/**
 * __useGetAllExchangesQuery__
 *
 * To run a query within a React component, call `useGetAllExchangesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllExchangesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllExchangesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllExchangesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllExchangesQuery, GetAllExchangesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllExchangesQuery, GetAllExchangesQueryVariables>(GetAllExchangesDocument, options);
      }
export function useGetAllExchangesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllExchangesQuery, GetAllExchangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllExchangesQuery, GetAllExchangesQueryVariables>(GetAllExchangesDocument, options);
        }
export type GetAllExchangesQueryHookResult = ReturnType<typeof useGetAllExchangesQuery>;
export type GetAllExchangesLazyQueryHookResult = ReturnType<typeof useGetAllExchangesLazyQuery>;
export type GetAllExchangesQueryResult = Apollo.QueryResult<GetAllExchangesQuery, GetAllExchangesQueryVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateInput: CreateInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Exchange: ResolverTypeWrapper<Exchange>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  PriceType: PriceType;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateInput: CreateInput;
  Date: Scalars['Date'];
  Exchange: Exchange;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ExchangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Exchange'] = ResolversParentTypes['Exchange']> = {
  amount1?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amount2?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currencyFrom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currencyTo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['PriceType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createExchange?: Resolver<Maybe<ResolversTypes['Exchange']>, ParentType, ContextType, RequireFields<MutationCreateExchangeArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  filterExchanges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Exchange']>>>, ParentType, ContextType, RequireFields<QueryFilterExchangesArgs, 'dateTime'>>;
  getAllExchanges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Exchange']>>>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Exchange?: ExchangeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


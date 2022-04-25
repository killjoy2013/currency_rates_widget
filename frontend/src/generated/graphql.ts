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
  currencyFrom: CurrencyInput;
  currencyTo: CurrencyInput;
  type: PriceType;
};

export type Currency = {
  __typename?: 'Currency';
  abbr: Scalars['String'];
  name: Scalars['String'];
};

export type CurrencyInput = {
  abbr: Scalars['String'];
  name: Scalars['String'];
};

export type CurrencyItemType = {
  __typename?: 'CurrencyItemType';
  abbr: Scalars['String'];
  name: Scalars['String'];
};

export type Exchange = {
  __typename?: 'Exchange';
  amount1?: Maybe<Scalars['Float']>;
  amount2?: Maybe<Scalars['Float']>;
  currencyFrom?: Maybe<Currency>;
  currencyTo?: Maybe<Currency>;
  dateTime?: Maybe<Scalars['Date']>;
  fakeCycleId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<PriceType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createExchange: Transaction;
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
  getExchanges: Array<Exchange>;
};


export type QueryGetExchangesArgs = {
  input?: InputMaybe<QueryInput>;
};

export type QueryInput = {
  fromDate?: InputMaybe<Scalars['Date']>;
  toDate?: InputMaybe<Scalars['Date']>;
  type?: InputMaybe<PriceType>;
};

export enum Status {
  Approved = 'Approved',
  Rejected = 'Rejected'
}

export type Transaction = {
  __typename?: 'Transaction';
  exchange: Exchange;
  status: Status;
};

export type GetExchangesQueryVariables = Exact<{
  input?: InputMaybe<QueryInput>;
}>;


export type GetExchangesQuery = { __typename?: 'Query', getExchanges: Array<{ __typename?: 'Exchange', id?: string | null, fakeCycleId?: number | null, dateTime?: any | null, amount1?: number | null, amount2?: number | null, type?: PriceType | null, currencyFrom?: { __typename?: 'Currency', name: string, abbr: string } | null, currencyTo?: { __typename?: 'Currency', name: string, abbr: string } | null }> };

export type CreateExchangeMutationVariables = Exact<{
  input: CreateInput;
}>;


export type CreateExchangeMutation = { __typename?: 'Mutation', createExchange: { __typename?: 'Transaction', status: Status, exchange: { __typename?: 'Exchange', id?: string | null, fakeCycleId?: number | null, dateTime?: any | null, amount1?: number | null, amount2?: number | null, type?: PriceType | null, currencyFrom?: { __typename?: 'Currency', name: string, abbr: string } | null, currencyTo?: { __typename?: 'Currency', name: string, abbr: string } | null } } };


export const GetExchangesDocument = gql`
    query getExchanges($input: QueryInput) {
  getExchanges(input: $input) {
    id
    fakeCycleId
    dateTime
    currencyFrom {
      name
      abbr
    }
    amount1
    currencyTo {
      name
      abbr
    }
    amount2
    type
  }
}
    `;

/**
 * __useGetExchangesQuery__
 *
 * To run a query within a React component, call `useGetExchangesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetExchangesQuery(baseOptions?: Apollo.QueryHookOptions<GetExchangesQuery, GetExchangesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExchangesQuery, GetExchangesQueryVariables>(GetExchangesDocument, options);
      }
export function useGetExchangesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExchangesQuery, GetExchangesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExchangesQuery, GetExchangesQueryVariables>(GetExchangesDocument, options);
        }
export type GetExchangesQueryHookResult = ReturnType<typeof useGetExchangesQuery>;
export type GetExchangesLazyQueryHookResult = ReturnType<typeof useGetExchangesLazyQuery>;
export type GetExchangesQueryResult = Apollo.QueryResult<GetExchangesQuery, GetExchangesQueryVariables>;
export const CreateExchangeDocument = gql`
    mutation createExchange($input: CreateInput!) {
  createExchange(input: $input) {
    exchange {
      id
      fakeCycleId
      dateTime
      currencyFrom {
        name
        abbr
      }
      amount1
      currencyTo {
        name
        abbr
      }
      amount2
      dateTime
      type
    }
    status
  }
}
    `;
export type CreateExchangeMutationFn = Apollo.MutationFunction<CreateExchangeMutation, CreateExchangeMutationVariables>;

/**
 * __useCreateExchangeMutation__
 *
 * To run a mutation, you first call `useCreateExchangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExchangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExchangeMutation, { data, loading, error }] = useCreateExchangeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExchangeMutation(baseOptions?: Apollo.MutationHookOptions<CreateExchangeMutation, CreateExchangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExchangeMutation, CreateExchangeMutationVariables>(CreateExchangeDocument, options);
      }
export type CreateExchangeMutationHookResult = ReturnType<typeof useCreateExchangeMutation>;
export type CreateExchangeMutationResult = Apollo.MutationResult<CreateExchangeMutation>;
export type CreateExchangeMutationOptions = Apollo.BaseMutationOptions<CreateExchangeMutation, CreateExchangeMutationVariables>;


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
  Currency: ResolverTypeWrapper<Currency>;
  CurrencyInput: CurrencyInput;
  CurrencyItemType: ResolverTypeWrapper<CurrencyItemType>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Exchange: ResolverTypeWrapper<Exchange>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  PriceType: PriceType;
  Query: ResolverTypeWrapper<{}>;
  QueryInput: QueryInput;
  Status: Status;
  String: ResolverTypeWrapper<Scalars['String']>;
  Transaction: ResolverTypeWrapper<Transaction>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateInput: CreateInput;
  Currency: Currency;
  CurrencyInput: CurrencyInput;
  CurrencyItemType: CurrencyItemType;
  Date: Scalars['Date'];
  Exchange: Exchange;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  QueryInput: QueryInput;
  String: Scalars['String'];
  Transaction: Transaction;
};

export type CurrencyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Currency'] = ResolversParentTypes['Currency']> = {
  abbr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrencyItemTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrencyItemType'] = ResolversParentTypes['CurrencyItemType']> = {
  abbr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ExchangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Exchange'] = ResolversParentTypes['Exchange']> = {
  amount1?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  amount2?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currencyFrom?: Resolver<Maybe<ResolversTypes['Currency']>, ParentType, ContextType>;
  currencyTo?: Resolver<Maybe<ResolversTypes['Currency']>, ParentType, ContextType>;
  dateTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  fakeCycleId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['PriceType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createExchange?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType, RequireFields<MutationCreateExchangeArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getExchanges?: Resolver<Array<ResolversTypes['Exchange']>, ParentType, ContextType, Partial<QueryGetExchangesArgs>>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  exchange?: Resolver<ResolversTypes['Exchange'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Currency?: CurrencyResolvers<ContextType>;
  CurrencyItemType?: CurrencyItemTypeResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Exchange?: ExchangeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
};


import { InMemoryCache, makeVar } from "@apollo/client";
import { Exchange, PriceType, QueryInput } from "@src/generated/graphql";
import { removeTimePart } from "@src/helpers/DateHelpers";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getExchanges: {
          merge: (existing, incoming) => {
            return incoming;
          },
        },
      },
    },
  },
});

export const filterFormDataVar = makeVar<QueryInput>({
  fromDate: removeTimePart(new Date()),
  toDate: removeTimePart(new Date()),
  type: PriceType.All,
  pageNumber: 1,
  pageSize: parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE as string),
});

export const latestRatesVar = makeVar<Array<Exchange>>([
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:47.300Z",
    currencyFrom: {
      name: "Bitcoin",
      abbr: "BTC",
    },
    amount1: 1,
    currencyTo: {
      name: "Euro",
      abbr: "EUR",
    },
    amount2: 36061.70923698074,
    type: PriceType.LivePrice,
    id: "6266471faae226d08c1572c4",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:47.300Z",
    currencyFrom: {
      name: "Bitcoin",
      abbr: "BTC",
    },
    amount1: 1,
    currencyTo: {
      name: "American Dollar",
      abbr: "USD",
    },
    amount2: 38652.62414130844,
    type: PriceType.LivePrice,

    id: "6266471faae226d08c1572c7",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:47.300Z",
    currencyFrom: {
      name: "Bitcoin",
      abbr: "BTC",
    },
    amount1: 1,
    currencyTo: {
      name: "Pound sterling",
      abbr: "GBP",
    },
    amount2: 30350.673812251167,
    type: PriceType.LivePrice,
    id: "6266471faae226d08c1572ca",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:47.300Z",
    currencyFrom: {
      name: "Bitcoin",
      abbr: "BTC",
    },
    amount1: 1,
    currencyTo: {
      name: "Canadian Dollar",
      abbr: "CAD",
    },
    amount2: 49177.276827823975,
    type: PriceType.LivePrice,
    id: "6266471faae226d08c1572cd",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:48.000Z",
    currencyFrom: {
      name: "Ethereum",
      abbr: "ETH",
    },
    amount1: 1,
    currencyTo: {
      name: "Euro",
      abbr: "EUR",
    },
    amount2: 2632.9620421677914,
    type: PriceType.LivePrice,
    id: "62664720aae226d08c1572d3",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:48.000Z",
    currencyFrom: {
      name: "Ethereum",
      abbr: "ETH",
    },
    amount1: 1,
    currencyTo: {
      name: "American Dollar",
      abbr: "USD",
    },
    amount2: 2822.6667804147614,
    type: PriceType.LivePrice,
    id: "62664720aae226d08c1572d6",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:48.000Z",
    currencyFrom: {
      name: "Ethereum",
      abbr: "ETH",
    },
    amount1: 1,
    currencyTo: {
      name: "Pound sterling",
      abbr: "GBP",
    },
    amount2: 2216.189777845762,
    type: PriceType.LivePrice,
    id: "62664720aae226d08c1572d9",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:48.000Z",
    currencyFrom: {
      name: "Ethereum",
      abbr: "ETH",
    },
    amount1: 1,
    currencyTo: {
      name: "Canadian Dollar",
      abbr: "CAD",
    },
    amount2: 3591.0676734848,
    type: PriceType.LivePrice,
    id: "62664720aae226d08c1572dc",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:48.900Z",
    currencyFrom: {
      name: "Ripple",
      abbr: "XRP",
    },
    amount1: 1,
    currencyTo: {
      name: "Euro",
      abbr: "EUR",
    },
    amount2: 0.6106764654659402,
    type: PriceType.LivePrice,
    id: "62664721aae226d08c1572e2",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:48.900Z",
    currencyFrom: {
      name: "Ripple",
      abbr: "XRP",
    },
    amount1: 1,
    currencyTo: {
      name: "American Dollar",
      abbr: "USD",
    },
    amount2: 0.654675415170422,
    type: PriceType.LivePrice,
    id: "62664721aae226d08c1572e5",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:48.900Z",
    currencyFrom: {
      name: "Ripple",
      abbr: "XRP",
    },
    amount1: 1,
    currencyTo: {
      name: "Pound sterling",
      abbr: "GBP",
    },
    amount2: 0.5140228682907222,
    type: PriceType.LivePrice,
    id: "62664721aae226d08c1572e8",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:48.900Z",
    currencyFrom: {
      name: "Ripple",
      abbr: "XRP",
    },
    amount1: 1,
    currencyTo: {
      name: "Canadian Dollar",
      abbr: "CAD",
    },
    amount2: 0.832916667212898,
    type: PriceType.LivePrice,
    id: "62664721aae226d08c1572eb",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:49.700Z",
    currencyFrom: {
      name: "Litcoin",
      abbr: "LTC",
    },
    amount1: 1,
    currencyTo: {
      name: "Euro",
      abbr: "EUR",
    },
    amount2: 93.22347342981637,
    type: PriceType.LivePrice,
    id: "62664721aae226d08c1572f1",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:49.700Z",
    currencyFrom: {
      name: "Litcoin",
      abbr: "LTC",
    },
    amount1: 1,
    currencyTo: {
      name: "American Dollar",
      abbr: "USD",
    },
    amount2: 99.92651742189604,
    type: PriceType.LivePrice,
    id: "62664721aae226d08c1572f4",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:49.700Z",
    currencyFrom: {
      name: "Litcoin",
      abbr: "LTC",
    },
    amount1: 1,
    currencyTo: {
      name: "Pound sterling",
      abbr: "GBP",
    },
    amount2: 78.466557450019,
    type: PriceType.LivePrice,
    id: "62664721aae226d08c1572f7",
  },
  {
    fakeCycleId: 5,
    dateTime: "2022-04-25T07:00:49.700Z",
    currencyFrom: {
      name: "Litcoin",
      abbr: "LTC",
    },
    amount1: 1,
    currencyTo: {
      name: "Canadian Dollar",
      abbr: "CAD",
    },
    amount2: 127.14390162919108,
    type: PriceType.LivePrice,
    id: "62664721aae226d08c1572fa",
  },
]);

export const listToDisplayVar = makeVar<Array<Exchange>>([]);

export const currentPageNumberVar = makeVar<number>(1);

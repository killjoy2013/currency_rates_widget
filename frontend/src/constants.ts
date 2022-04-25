import { CurrencyItemType } from "@src/generated/graphql";

export const FAKE_EXCHANGE_CREATED = "FAKE_EXCHANGE_CREATED";

export const currencyFromList: CurrencyItemType[] = [
  {
    abbr: "BTC",
    name: "Bitcoin",
  },
  {
    abbr: "ETH",
    name: "Ethereum",
  },
  {
    abbr: "XRP",
    name: "Ripple",
  },
  {
    abbr: "LTC",
    name: "Litcoin",
  },
];

export const currencyToList: CurrencyItemType[] = [
  {
    abbr: "EUR",
    name: "Euro",
  },
  {
    abbr: "USD",
    name: "American Dollar",
  },
  {
    abbr: "GBP",
    name: "Pound sterling",
  },
  {
    abbr: "CAD",
    name: "Canadian Dollar",
  },
];

export enum PriceType {
  All = "All",
  Exchanged = "Exchanged",
  LivePrice = "LivePrice",
}

export enum Status {
  Approved = "Approved",
  Rejected = "Rejected",
}

export type Currency = {
  name: string;
  abbr: string;
};

export type Exchange = {
  id: string;
  fakeCycleId: number;
  dateTime: Date;
  currencyFrom: Currency;
  amount1: number;
  currencyTo: Currency;
  amount2: number;
  type: PriceType;
};

export type Transaction = {
  exchange: Exchange;
  status: Status;
};

export type CreateExchangeType = Omit<Exchange, "id">;

export type CoinApiResponse = {
  asset_id_base: string;
  rates: Array<{
    time: string;
    asset_id_quote: string;
    rate: number;
  }>;
};

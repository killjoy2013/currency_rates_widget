export enum PriceType {
  All = "All",
  Exchanged = "Exchanged",
  LivePrice = "LivePrice",
}

export enum Status {
  Approved = "Approved",
  Rejected = "Rejected",
}

export type Exchange = {
  id: string;
  dateTime: Date;
  currencyFrom: string;
  amount1: number;
  currencyTo: string;
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

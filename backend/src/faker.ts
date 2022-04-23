import https from "https";
import dotenv from "dotenv";
import Exchange from "./models/Exchange.model";
import { SocketRepository } from "./socket_repository";
import {
  CoinApiResponse,
  CreateExchangeType,
  ExchangeType,
  PriceType,
} from "./types";

export class Faker {
  static options = {
    method: "GET",
    hostname: "rest.coinapi.io",
    path: "/v1/exchangerate/",
    headers: { "X-CoinAPI-Key": "7EDA754C-640B-4C03-A138-EDB9FFB4909B" },
  };

  static FROM_CURRENCIES;
  static TO_CURRENCIES;
  static FAKER_INTERVAL_MIN;

  static {
    dotenv.config();
    this.FROM_CURRENCIES = process.env.FROM_CURRENCIES?.split(
      ","
    ) as Array<string>;
    this.TO_CURRENCIES = process.env.TO_CURRENCIES?.split(",") as Array<string>;
    this.FAKER_INTERVAL_MIN = parseInt(
      process.env.FAKER_INTERVAL_MIN as string
    );

    console.log({
      FROM_CURRENCIES: this.FROM_CURRENCIES,
      TO_CURRENCIES: this.TO_CURRENCIES,
      FAKER_INTERVAL_MIN: this.FAKER_INTERVAL_MIN,
    });
  }

  public static startFake = async () => {
    await Faker.fakerJob();
    setInterval(async () => {
      console.log("gooooo");
      await Faker.fakerJob();
    }, Faker.FAKER_INTERVAL_MIN * 60 * 1000);
  };

  static fakerJob = async () => {
    let bigList: CreateExchangeType[] = [];

    for (let fromCurrency of Object.values(Faker.FROM_CURRENCIES)) {
      let coinApiResponse = await Faker.getFakeDataFromApi(fromCurrency);

      bigList = [
        ...bigList,
        ...Faker.createExchangeListToInsert(coinApiResponse, fromCurrency),
      ];
    }

    await Faker.insertAndEmit(bigList);
  };

  static getFakeDataFromApi = async (fromCurrency: string) => {
    return new Promise<CoinApiResponse>(async (resolve, reject) => {
      let tempOptions = {
        ...Faker.options,
        path: `${Faker.options.path}${fromCurrency}`,
      };
      https
        .get(tempOptions, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            let result = JSON.parse(data) as CoinApiResponse;
            resolve(result);
          });
        })
        .on("error", (err) => {
          console.log(err.message);
          reject(err.message);
        })
        .end();
    });
  };

  static createExchangeListToInsert = (
    coinApiResponse: CoinApiResponse,
    fromCurrency: string
  ) => {
    let result: CreateExchangeType[] = [];

    Faker.TO_CURRENCIES.forEach((toCurrency) => {
      let rateItem = coinApiResponse.rates.find(
        (f) => f.asset_id_quote == toCurrency
      );
      try {
        result.push({
          amount1: 1,
          amount2: rateItem?.rate as number,
          currencyFrom: fromCurrency,
          currencyTo: rateItem?.asset_id_quote as string,
          dateTime: new Date(rateItem?.time as string),
          type: PriceType.LivePrice,
        });
      } catch (error) {
        console.error(error);
      }
    });

    return result;
  };

  static insertAndEmit = async (itemsToInsert: CreateExchangeType[]) => {
    await Exchange.create(itemsToInsert);
    SocketRepository.emitMessage(itemsToInsert);
  };
}

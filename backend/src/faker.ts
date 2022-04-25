import https from "https";
import dotenv from "dotenv";
import ExchangeModel from "./models/Exchange.model";
import { SocketRepository } from "./socket_repository";
import {
  CoinApiResponse,
  CreateExchangeType,
  Currency,
  Exchange,
  PriceType,
} from "./types";

export class Faker {
  // static options = {
  //   method: "GET",
  //   hostname: "rest.coinapi.io",
  //   path: "/v1/exchangerate/",
  //   headers: { "X-CoinAPI-Key": "7EDA754C-640B-4C03-A138-EDB9FFB4909B" },
  //   //headers: { "X-CoinAPI-Key": "B951CEAB-0BE1-4991-AE0F-38491B0A785D" },
  // };

  static options: any = {
    method: "GET",
  };

  static FROM_CURRENCIES = [
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

  static TO_CURRENCIES = [
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
  static FAKER_INTERVAL_MIN;

  static {
    dotenv.config();
    this.FAKER_INTERVAL_MIN = parseInt(
      process.env.FAKER_INTERVAL_MIN as string
    );

    this.options = {
      ...this.options,
      hostname: process.env.COIN_API_HOSTNAME,
      path: process.env.COIN_API_PATH,
      headers: { "X-CoinAPI-Key": process.env.COIN_API_KEY },
    };

    console.log({ options: this.options });
  }

  public static startFake = async () => {
    let intervalId = setInterval(async () => {
      try {
        await Faker.fakerJob();
      } catch (error) {
        clearInterval(intervalId);
        console.log("interval cleared");
      }
    }, Faker.FAKER_INTERVAL_MIN * 60 * 1000);
  };

  static fakerJob = async () => {
    let bigList: CreateExchangeType[] = [];

    for (let fromCurrency of Object.values(Faker.FROM_CURRENCIES)) {
      let coinApiResponse = await Faker.getFakeDataFromApi(fromCurrency.abbr);

      if (coinApiResponse.error) {
        console.error(coinApiResponse.error);
        throw new Error(coinApiResponse.error);
      }

      bigList = [
        ...bigList,
        ...(await Faker.createExchangeListToInsert(
          coinApiResponse,
          fromCurrency
        )),
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

  static createExchangeListToInsert = async (
    coinApiResponse: CoinApiResponse,
    currencyFrom: Currency
  ) => {
    let result: CreateExchangeType[] = [];
    let newMaxId = await this.getMaxFakeCycleId();

    Faker.TO_CURRENCIES.forEach((toCurrency) => {
      let rateItem = coinApiResponse.rates.find(
        (f) => f.asset_id_quote == toCurrency.abbr
      );

      let currencyTo: Currency = this.TO_CURRENCIES.find(
        (f) => f.abbr == (rateItem?.asset_id_quote as string)
      ) as Currency;

      try {
        result.push(
          new ExchangeModel<CreateExchangeType>({
            fakeCycleId: newMaxId,
            amount1: 1,
            amount2: rateItem?.rate as number,
            currencyFrom,
            currencyTo,
            dateTime: new Date(rateItem?.time as string),
            type: PriceType.LivePrice,
          })
        );
      } catch (error) {
        console.error(error);
      }
    });

    return result;
  };

  static getMaxFakeCycleId = async () => {
    let latestFakedDoc = await ExchangeModel.find({ type: PriceType.LivePrice })
      .sort({ dateTime: -1 })
      .limit(1);
    return latestFakedDoc[0].fakeCycleId + 1;
  };

  static insertAndEmit = async (itemsToInsert: any[]) => {
    await ExchangeModel.create(itemsToInsert);

    /*
    I know it's quite a hack, however I need to decorate the created documents with id.
    I just add id field from built-in _id
    */
    let convertedItems = itemsToInsert.map((m: any) => ({
      ...m._doc,
      id: m._doc._id,
    }));
    SocketRepository.emitMessage(convertedItems);
    console.log("exchange data emitted");
  };
}

import { useCallback, useReducer, useState } from "react";
import classes from "../../styles/Widget.module.css";
import Button from "../elements/Button";
import Select from "../elements/select/Select";
import TextInput from "../elements/TextInput";

export type EventType = {
  name: string;
  value: number;
};

export type CurrencyItemType = {
  abbr: string;
  name: string;
};

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

let mockRatesActual = {
  timestamp: "555555555",
  data: [
    {
      source: "USD",
      targets: [
        {
          currency: "BTC",
          rate: 4500,
        },
        {
          currency: "ETH",
          rate: 123,
        },
        {
          currency: "XRP",
          rate: 234,
        },
        {
          currency: "LTC",
          rate: 1277,
        },
      ],
    },
    {
      source: "EUR",
      targets: [
        {
          currency: "BTC",
          rate: 3500,
        },
        {
          currency: "ETH",
          rate: 100,
        },
        {
          currency: "XRP",
          rate: 220,
        },
        {
          currency: "LTC",
          rate: 3931,
        },
      ],
    },
    {
      source: "GBP",
      targets: [
        {
          currency: "BTC",
          rate: 2500,
        },
        {
          currency: "ETH",
          rate: 1300,
        },
        {
          currency: "XRP",
          rate: 1220,
        },
        {
          currency: "LTC",
          rate: 931,
        },
      ],
    },
    {
      source: "CAD",
      targets: [
        {
          currency: "BTC",
          rate: 4399,
        },
        {
          currency: "ETH",
          rate: 3400,
        },
        {
          currency: "XRP",
          rate: 7820,
        },
        {
          currency: "LTC",
          rate: 8800,
        },
      ],
    },
  ],
};

export type FormState = {
  currencyFrom: CurrencyItemType;
  currencyTo: CurrencyItemType;
  amountFrom: number;
  amountTo: number;
};

export type Payload = {
  currencyFrom?: CurrencyItemType;
  currencyTo?: CurrencyItemType;
  amountFrom?: string;
};

const initialFormState: FormState = {
  amountFrom: 1,
  amountTo: 0,
  currencyFrom: {
    abbr: "BTC",
    name: "Bitcoin",
  },
  currencyTo: {
    abbr: "USD",
    name: "American Dollar",
  },
};

enum ActionType {
  CURRENCY_FROM = "CURRENCY_FROM",
  CURRENCY_TO = "CURRENCY_TO",
  AMOUNT_FROM = "AMOUNT_FROM",
}

type Action = {
  type: ActionType;
  payload: Payload;
};

function formStateReducer(oldState: FormState, action: Action): FormState {
  let newState: FormState;
  //   console.log({ action, oldState });
  const { type, payload } = action;

  switch (type) {
    case ActionType.AMOUNT_FROM:
      newState = { ...oldState, amountFrom: Number(payload.amountFrom) };
      break;
    case ActionType.CURRENCY_FROM:
      newState = {
        ...oldState,
        currencyFrom: payload.currencyFrom as CurrencyItemType,
      };
      break;
    case ActionType.CURRENCY_TO:
      newState = {
        ...oldState,
        currencyTo: payload.currencyTo as CurrencyItemType,
      };
      break;
    default:
      throw new Error();
  }

  let rates = mockRatesActual.data.find(
    (f) => f.source == newState.currencyTo?.abbr
  );

  if (!rates) {
    return { ...newState, amountTo: 0 };
  } else {
    let target = rates.targets.find(
      (f) => f.currency == newState.currencyFrom?.abbr
    );

    if (!target) {
      return newState;
    } else {
      let amountTo = (newState as FormState)?.amountFrom * target.rate;
      return { ...newState, amountTo };
    }
  }
}

const ExchangeForm = () => {
  const [state, dispatch] = useReducer(formStateReducer, initialFormState);

  return (
    <div className={classes.form}>
      <Select
        name="currency-from"
        value={state.currencyFrom as CurrencyItemType}
        label="Currency from"
        items={currencyFromList}
        show="name"
        onChange={(e) =>
          dispatch({
            payload: { currencyFrom: e },
            type: ActionType.CURRENCY_FROM,
          })
        }
      />
      <TextInput
        label="Amount"
        value={state.amountFrom as number}
        onChange={(e) =>
          dispatch({
            payload: { amountFrom: e },
            type: ActionType.AMOUNT_FROM,
          })
        }
      />
      <span className={`${classes.equal} ${classes.formElement}`}>=</span>
      <Select
        name="currency-to"
        value={state.currencyTo as CurrencyItemType}
        label="Currency to"
        items={currencyToList}
        show="abbr"
        onChange={(e) =>
          dispatch({
            payload: { currencyTo: e },
            type: ActionType.CURRENCY_TO,
          })
        }
      />
      <TextInput
        label="Amount"
        value={state.amountTo as number}
        currencyItem={state.currencyTo}
      />
      <Button label="Save" />
    </div>
  );
};

export default ExchangeForm;

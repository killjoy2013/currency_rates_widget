import Image from "next/image";
import { useReducer, useState } from "react";
import styles from "../../styles/ExchangeForm.module.css";
import genericStyles from "../../styles/Generic.module.css";
import Button from "../elements/Button";
import DropDown from "../elements/DropDown";
import TextInput from "../elements/TextInput";
import ExchangeModalContent from "./ExchangeModalContent";
import Modal from "./Modal";

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
  amountFrom: number | string;
  amountTo: number | string;
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
  const { type, payload } = action;

  switch (type) {
    case ActionType.AMOUNT_FROM:
      if ((payload.amountFrom as string).trim() === "") {
        newState = { ...oldState, amountFrom: "" };
      } else if (!isNaN(payload.amountFrom as any)) {
        newState = { ...oldState, amountFrom: Number(payload.amountFrom) };
      } else {
        newState = oldState;
      }

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
      let amountTo =
        newState.amountFrom === ""
          ? ""
          : (newState.amountFrom as number) * target.rate;
      return { ...newState, amountTo };
    }
  }
}

const Row = ({ data }: { data: CurrencyItemType }) => (
  <>
    <Image src={`/icons/${data.abbr}.svg`} width={36} height={16} alt="" />
    <div>{`${data.abbr} - ${data.name}`}</div>
  </>
);

const Selected = ({ data }: { data: CurrencyItemType }) => (
  <>
    <Image src={`/icons/${data.abbr}.svg`} width={36} height={16} alt="" />
    <div>{`${data.name}`}</div>
  </>
);

const ExchangeForm = () => {
  const [state, dispatch] = useReducer(formStateReducer, initialFormState);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={genericStyles.form}>
      <DropDown<CurrencyItemType>
        Row={Row}
        Selected={Selected}
        name="currency-from"
        value={state.currencyFrom as CurrencyItemType}
        label="Currency from"
        items={currencyFromList}
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
      <span className={`${styles.equal}`}>=</span>
      <DropDown
        name="currency-to"
        Row={Row}
        Selected={Selected}
        value={state.currencyTo as CurrencyItemType}
        label="Currency to"
        items={currencyToList}
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
      <Button
        label="Save"
        variant="filled"
        onClick={() => setShowModal(true)}
      />
      <Modal
        show={showModal}
        title="Exchange"
        onClose={() => setShowModal(false)}
      >
        <ExchangeModalContent
          date={new Date()}
          status="Approved"
          formState={state}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ExchangeForm;

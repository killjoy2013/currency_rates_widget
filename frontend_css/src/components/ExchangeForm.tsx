import React, { useContext, useEffect, useReducer, useState } from "react";
import { useApolloClient } from "@apollo/client";
import Button from "@src/elements/Button";
import DropDown from "@src/elements/DropDown";
import TextInput from "@src/elements/TextInput";
import {
  CurrencyItemType,
  PriceType,
  Status,
  Transaction,
  useCreateExchangeMutation,
} from "@src/generated/graphql";
import { HandlerContext } from "@src/contexts/HandlerContext";
import styles from "@styles/ExchangeForm.module.css";
import genericStyles from "@styles/Generic.module.css";
import Image from "next/image";
import Modal from "./Modal";
import ExchangeModalContent from "./TransactionModalContent";
import { currencyFromList, currencyToList } from "@src/constants";

export type EventType = {
  name: string;
  value: number;
};

// let mockRatesActual = {
//   timestamp: "555555555",
//   data: [
//     {
//       source: "USD",
//       targets: [
//         {
//           currency: "BTC",
//           rate: 4500,
//         },
//         {
//           currency: "ETH",
//           rate: 123,
//         },
//         {
//           currency: "XRP",
//           rate: 234,
//         },
//         {
//           currency: "LTC",
//           rate: 1277,
//         },
//       ],
//     },
//     {
//       source: "EUR",
//       targets: [
//         {
//           currency: "BTC",
//           rate: 3500,
//         },
//         {
//           currency: "ETH",
//           rate: 100,
//         },
//         {
//           currency: "XRP",
//           rate: 220,
//         },
//         {
//           currency: "LTC",
//           rate: 3931,
//         },
//       ],
//     },
//     {
//       source: "GBP",
//       targets: [
//         {
//           currency: "BTC",
//           rate: 2500,
//         },
//         {
//           currency: "ETH",
//           rate: 1300,
//         },
//         {
//           currency: "XRP",
//           rate: 1220,
//         },
//         {
//           currency: "LTC",
//           rate: 931,
//         },
//       ],
//     },
//     {
//       source: "CAD",
//       targets: [
//         {
//           currency: "BTC",
//           rate: 4399,
//         },
//         {
//           currency: "ETH",
//           rate: 3400,
//         },
//         {
//           currency: "XRP",
//           rate: 7820,
//         },
//         {
//           currency: "LTC",
//           rate: 8800,
//         },
//       ],
//     },
//   ],
// };

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

  //todo

  return newState;
  // let rates = mockRatesActual.data.find(
  //   (f) => f.source == newState.currencyTo?.abbr
  // );

  // if (!rates) {
  //   return { ...newState, amountTo: 0 };
  // } else {
  //   let target = rates.targets.find(
  //     (f) => f.currency == newState.currencyFrom?.abbr
  //   );

  //   if (!target) {
  //     return newState;
  //   } else {
  //     let amountTo =
  //       newState.amountFrom === ""
  //         ? ""
  //         : (newState.amountFrom as number) * target.rate;
  //     return { ...newState, amountTo };
  //   }
  // }
}

const Row = ({ data }: { data: CurrencyItemType }) => (
  <>
    <Image src={`/icons/${data.abbr}.svg`} width={36} height={16} alt="" />
    <div>{`${data.abbr} - ${data.name}`}</div>
  </>
);

const Selected = ({ data }: { data: CurrencyItemType }) => (
  <div className={styles.currencyTo}>
    <Image src={`/icons/${data.abbr}.svg`} width={36} height={16} alt="" />
    <div>{`${data.name}`}</div>
  </div>
);

const ExchangeForm = () => {
  const { addExchangeToCache } = useContext(HandlerContext);
  const [state, dispatch] = useReducer(formStateReducer, initialFormState);
  const [showModal, setShowModal] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>();
  const client = useApolloClient();
  const [createExchange] = useCreateExchangeMutation();

  const createHandler = () => {
    const { amountFrom, amountTo, currencyFrom, currencyTo } = state;
    const onTransactionCompleted = createExchange({
      variables: {
        input: {
          amount1: amountFrom as number,
          amount2: amountTo as number,
          currencyFrom: currencyFrom.name,
          currencyTo: currencyTo.abbr,
          type: PriceType.Exchanged,
        },
      },
      onCompleted: ({ createExchange: transaction }) => {
        if (transaction.status == Status.Approved) {
          addExchangeToCache([transaction.exchange]);
        }
        setTransaction(transaction as Transaction);
        setShowModal(true);
      },
    });
  };

  useEffect(() => {
    dispatch({
      payload: {
        amountFrom: "1",
      },
      type: ActionType.AMOUNT_FROM,
    });
  }, []);

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
      <Button label="Save" variant="filled" onClick={createHandler} />
      <Modal
        show={showModal}
        title="Exchange"
        onClose={() => setShowModal(false)}
      >
        {transaction && (
          <ExchangeModalContent
            transaction={transaction}
            onClose={() => setShowModal(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default ExchangeForm;

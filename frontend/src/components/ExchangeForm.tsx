import { useApolloClient, useReactiveVar } from "@apollo/client";
import { currencyFromList, currencyToList } from "@src/constants";
import { HandlerContext } from "@src/contexts/HandlerContext";
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
import { latestRatesVar } from "@src/lib/cache";
import styles from "@styles/ExchangeForm.module.css";
import genericStyles from "@styles/Generic.module.css";
import Image from "next/image";
import React, { useContext, useEffect, useReducer, useState } from "react";
import Modal from "./Modal";
import ExchangeModalContent from "./TransactionModalContent";

/*
ExchangeForm needs a rather complicated state management. 
Not only every field update wil change the formstate, but also amount2 value will be calculated.
Using useReducer hook makes sense here. We can implement a state update logic in reducer function
*/

export type EventType = {
  name: string;
  value: number;
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

/*
Form will be populated with BTC & USD data initially
*/
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

//predefined action types that will cange the state
enum ActionType {
  CURRENCY_FROM = "CURRENCY_FROM",
  CURRENCY_TO = "CURRENCY_TO",
  AMOUNT_FROM = "AMOUNT_FROM",
}

//typical Action needs to have type & payload
type Action = {
  type: ActionType;
  payload: Payload;
};

/*
Here is the crucial part where we implement the state change logic
Basically it gets the old state & an action then produces a new state
*/
function formStateReducer(oldState: FormState, action: Action): FormState {
  let newState: FormState;
  const { type, payload } = action;

  switch (type) {
    case ActionType.AMOUNT_FROM:
      //we prevent non numeric value input, only numbers can be entered
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

  //lateset rates which we receive over websocket are kept in apollo client cache as latestRatesVar reactive variable.
  //we need to update amountTo data before we return the new state
  let targetCurrency = latestRatesVar().find(
    (f) =>
      f.currencyFrom?.abbr == newState.currencyFrom?.abbr &&
      f.currencyTo?.abbr == newState.currencyTo?.abbr
  );

  if (targetCurrency && targetCurrency.amount2) {
    let amountTo =
      newState.amountFrom === ""
        ? ""
        : (newState.amountFrom as number) * targetCurrency.amount2; //now we can set amountTo value
    return { ...newState, amountTo };
  } else {
    return newState;
  }
}

//currencyFrom & currencyTo fields behaves the same way.
//So, their DropDown component will use the same Row & Selected structure with image & text
//Next.js provides an Image component. We use it
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
  //get the handler from context
  const { addExchangeToCache } = useContext(HandlerContext);
  //create the dispatcher
  const [state, dispatch] = useReducer(formStateReducer, initialFormState);
  //model window visibility
  const [showModal, setShowModal] = useState(false);
  //Transaction object will be returned from manual exchange create operation. We'll use it to display modal
  const [transaction, setTransaction] = useState<Transaction>();

  const [createExchange] = useCreateExchangeMutation();

  //we need to trigger the rerender upon change in latestRates over websocket. So, need to use our reactive variable with useReactiveVar hook.
  const latestRates = useReactiveVar(latestRatesVar);

  //fakeCycleId is the id for CoinAPI exchange rate collecion. It increments each time we collect data from api.
  //need to use it in our useEffect dependency array to trigger the state update so that amountTo field will be changed
  const dependencyValue = latestRates[0].fakeCycleId;

  //we can move this handler to HandlerContext
  const createHandler = () => {
    const { amountFrom, amountTo, currencyFrom, currencyTo } = state;
    createExchange({
      variables: {
        input: {
          amount1: amountFrom as number,
          amount2: amountTo as number,
          currencyFrom: currencyFrom,
          currencyTo: currencyTo,
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
    //amountTo field will be canculated upon render
    dispatch({
      payload: {
        amountFrom: state.amountFrom.toString(),
      },
      type: ActionType.AMOUNT_FROM,
    });
  }, [dependencyValue]);

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

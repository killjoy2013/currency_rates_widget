import React, { FunctionComponent } from "react";
import moment from "moment";
import styles from "../../styles/ExchangeModalContent.module.css";
import Button from "../elements/Button";
import { FormState } from "./ExchangeForm";
import { getCurrencyDisplayText } from "../helpers/TextHelpers";
import { Exchange, Transaction } from "@src/generated/graphql";

interface ExchangeModalContentProps {
  transaction: Transaction;
  onClose: () => void;
}

const ExchangeModalContent: FunctionComponent<ExchangeModalContentProps> = ({
  transaction,
  onClose,
}) => {
  const { status } = transaction;
  const { exchange } = transaction;

  const { amount1, amount2, currencyFrom, currencyTo, dateTime, type } =
    exchange as Exchange;

  console.log({
    status,
    amount1,
    amount2,
    currencyFrom,
    currencyTo,
    dateTime,
    type,
  });

  const TotalAmountDisplay = () => {
    return (
      <>
        <div className={styles.totalAmount}>
          <strong>
            {getCurrencyDisplayText(amount2 as number, currencyTo as string)}
          </strong>
          &nbsp; &nbsp; &nbsp;
          <div>
            {`${currencyFrom} ${getCurrencyDisplayText(amount2 as number)}`}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.body}>
        <div>Date & Time </div>
        <div>{moment(dateTime).format("DD/mm/yyyy HH:mm")} </div>
        <div>Status </div>
        <div>{status}</div>
        <div>From </div>
        <div>{currencyFrom}</div>
        <div>To </div>
        <div>{currencyTo}</div>
        <div>Total Amount </div>
        <TotalAmountDisplay />
      </div>
      <Button
        className={styles.footer}
        variant="filled"
        label="Close"
        onClick={onClose}
      />
    </div>
  );
};

export default ExchangeModalContent;

import React, { FunctionComponent } from "react";
import moment from "moment";
import styles from "@styles/ExchangeModalContent.module.css";
import genericStyles from "@styles/Generic.module.css";
import Button from "@src/elements/Button";
import { FormState } from "./ExchangeForm";
import { getCurrencyDisplayText } from "@src/helpers/TextHelpers";
import { Exchange, Status, Transaction } from "@src/generated/graphql";
import clsx from "clsx";

interface ExchangeModalContentProps {
  transaction: Transaction;
  onClose: () => void;
}

const TransactionModalContent: FunctionComponent<ExchangeModalContentProps> = ({
  transaction,
  onClose,
}) => {
  const { status } = transaction;
  const { exchange } = transaction;

  const { amount1, amount2, currencyFrom, currencyTo, dateTime, type } =
    exchange as Exchange;

  const TotalAmountDisplay = () => {
    return (
      <>
        <div className={styles.totalAmount}>
          <strong>
            {getCurrencyDisplayText(
              amount2 as number,
              currencyTo?.abbr as string
            )}
          </strong>
          &nbsp; &nbsp; &nbsp;
          <div>
            {`${currencyFrom?.abbr} ${getCurrencyDisplayText(
              amount1 as number
            )}`}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.body}>
        <div>Date & Time </div>
        <div>{moment(dateTime).format("DD/MM/yyyy HH:mm")} </div>
        <div>Status </div>
        <div className={styles.statusContainer}>
          <div
            className={clsx(
              genericStyles.indicator,
              status == Status.Approved && genericStyles.approvedIcon,
              status == Status.Rejected && genericStyles.rejectedIcon
            )}
          />
          <div
            className={clsx(
              status == Status.Approved && genericStyles.approvedText,
              status == Status.Rejected && genericStyles.rejectedText
            )}
          >
            {status}
          </div>
        </div>

        <div>From </div>
        <div>{currencyFrom?.abbr}</div>
        <div>To </div>
        <div>{currencyTo?.abbr}</div>
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

export default TransactionModalContent;

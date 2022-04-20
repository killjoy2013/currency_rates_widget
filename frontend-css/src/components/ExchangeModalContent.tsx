import React, { FunctionComponent } from "react";
import moment from "moment";
import styles from "../../styles/ExchangeModalContent.module.css";
import Button from "../elements/Button";
import { FormState } from "./ExchangeForm";
import { getCurrencyDisplayText } from "../helpers/TextHelpers";

interface ExchangeModalContentProps {
  formState: FormState;
  date: Date;
  status: string;
  onClose: () => void;
}

const ExchangeModalContent: FunctionComponent<ExchangeModalContentProps> = ({
  formState,
  date,
  status,
  onClose,
}) => {
  const { amountFrom, amountTo, currencyFrom, currencyTo } = formState;

  const TotalAmountDisplay = () => {
    return (
      <>
        <div className={styles.totalAmount}>
          <strong>
            {getCurrencyDisplayText(amountTo as number, currencyTo.abbr)}
          </strong>
          &nbsp; &nbsp; &nbsp;
          <div>
            {`${currencyFrom.abbr} ${getCurrencyDisplayText(
              amountFrom as number
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
        <div>{moment(date).format("DD/mm/yyyy HH:mm")} </div>
        <div>Status </div>
        <div>{status}</div>
        <div>From </div>
        <div>{currencyFrom.name}</div>
        <div>To </div>
        <div>{currencyTo.abbr}</div>
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

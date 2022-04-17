import React, { useEffect, useRef, useState } from "react";
import classes from "../../../styles/Widget.module.css";
import { CurrencyItemType, EventType } from "../../components/ExchangeForm";
import Modal from "./Modal";

type SelectProps = {
  items: CurrencyItemType[];
  label: string;
  name: string;
  show: "abbr" | "name";
  value: CurrencyItemType;
  onChange: (e: CurrencyItemType) => void;
};

const Select = (props: SelectProps) => {
  const { items, label, name, show, value, onChange } = props;
  const [open, setOpen] = useState(false);

  const getDisplay = (currencyItem: CurrencyItemType | undefined) => {
    if (currencyItem) {
      return currencyItem[`${show}`];
    } else {
      return "";
    }
  };

  return (
    <div className={`${classes.formItem} ${classes.select}`}>
      <span className={classes.formLabel}>{label}</span>
      <div
        id="input"
        className={classes.selectInput}
        onClick={(event) => {
          if (!open) {
            setOpen(true);
          }
        }}
      >
        {getDisplay(value)}
      </div>
      {open && (
        <Modal
          items={items}
          onChange={onChange}
          closeModal={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default Select;

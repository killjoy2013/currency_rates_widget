import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import classes from "../../styles/Widget.module.css";
import { CurrencyItemType, EventType } from "../components/ExchangeForm";
import Modal from "../components/modals/SelectModal";

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
    <div className={`${classes.formElement}`}>
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
        <Image src={`/icons/${value.abbr}.svg`} width={36} height={16} />
        <span>{getDisplay(value)}</span>
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

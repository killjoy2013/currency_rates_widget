import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import clsx from "clsx";
import genericStyles from "../../../styles/Generic.module.css";
import styles from "../../../styles/DropDown.module.css";
import { CurrencyItemType, EventType } from "../../components/ExchangeForm";
import Modal, { RowProps } from "./DropDownModal";

interface DropDownProps<T> {
  items: T[];
  Row: (props: RowProps<T>) => JSX.Element;
  Selected: (props: RowProps<T>) => JSX.Element;
  label: string;
  name: string;
  value: T;
  className?: string;
  onChange: (e: T) => void;
}

function DropDown<T>(props: DropDownProps<T>) {
  const { items, label, name, value, className, Row, Selected, onChange } =
    props;
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx(genericStyles.formElement, className)}>
      <span className={genericStyles.formLabel}>{label}</span>
      <div
        id="input"
        className={styles.selectInput}
        onClick={(event) => {
          if (!open) {
            setOpen(true);
          }
        }}
      >
        {open && <RiArrowUpSFill className={styles.arrow} />}
        {!open && <RiArrowDownSFill className={styles.arrow} />}

        <Selected data={value} />
      </div>
      {open && (
        <Modal
          items={items}
          Row={Row}
          onChange={onChange}
          closeModal={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default DropDown;

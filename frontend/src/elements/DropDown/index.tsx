import clsx from "clsx";
import React, { useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import styles from "@styles/DropDown.module.css";
import genericStyles from "@styles/Generic.module.css";
import Modal, { RowProps } from "./DropDownModal";

/*
DropDown is an important element and used quite oftenly, but displaying differently.
To avoid creating dublicated components, here we craeted our DropDown in a generic way using typescript generics.
we just need to provide the data to display, and tell the DropDown how to visualize supplying Row & Selected  properties.
They are JSX elements, so we can be craetive as much as we want to be.
*/

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
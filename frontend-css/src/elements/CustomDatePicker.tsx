import React, { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import styles from "../../styles/CustomDatePicker.module.css";
import genericStyles from "../../styles/Generic.module.css";
import "font-awesome/css/font-awesome.min.css";
import "react-datepicker/dist/react-datepicker.css";

type CustomDatePickerProps = {
  name: string;
  label: string;
  value: Date;
  onChange: ({ value }: { value: Date }) => void;
};

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const { name, label, value, onChange } = props;

  const CustomInput = (
    props: React.HTMLProps<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div>
        <div id={name} className={styles.container}>
          <span className={genericStyles.formLabel}>{label}</span>
          <input type="text" {...props} />
          <AiOutlineCalendar className={styles.icon} />
        </div>
      </div>
    );
  };

  return (
    <DatePicker
      wrapperClassName={styles.datePicker}
      customInput={React.createElement(React.forwardRef(CustomInput))}
      selected={value}
      onChange={(date: Date) => onChange({ value: date })}
    />
  );
};

export default CustomDatePicker;

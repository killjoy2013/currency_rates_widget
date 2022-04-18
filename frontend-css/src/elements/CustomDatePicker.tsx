import React, { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import classes from "../../styles/CustomDatePicker.module.css";
import "font-awesome/css/font-awesome.min.css";
import "react-datepicker/dist/react-datepicker.css";

type CustomDatePickerProps = {
  name: string;
  label: string;
  value: Date;
  onChange: ({ name, value }: { name: string; value: Date }) => void;
};

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const { name, label, value, onChange } = props;
  //const [startDate, setStartDate] = useState(new Date());

  const CustomInput = (
    props: React.HTMLProps<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div>
        <div className={classes.container}>
          <span className={classes.formLabel}>{label}</span>
          <input type="text" {...props} />
          <AiOutlineCalendar className={classes.icon} />
        </div>
      </div>
    );
  };

  return (
    <DatePicker
      wrapperClassName={classes.datePicker}
      customInput={React.createElement(React.forwardRef(CustomInput))}
      selected={value}
      onChange={(date: Date) => onChange({ name, value: date })}
    />
  );
};

export default CustomDatePicker;

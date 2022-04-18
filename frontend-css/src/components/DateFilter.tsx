import MyDatePicker from "../elements/CustomDatePicker";
import classes from "../../styles/DateFilter.module.css";
import { useState } from "react";

type FormData = {
  fromDate?: any;
  toDate?: any;
  type?: any;
};

const DateFilter = () => {
  const [formData, setFormData] = useState<FormData>({
    fromDate: new Date(),
    toDate: new Date(),
  });

  const changeHandler = ({ name, value }: { name: string; value: any }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log({ name, value });
  };

  return (
    <div className={classes.container}>
      <MyDatePicker
        name="fromDate"
        value={formData?.fromDate}
        label="From date"
        onChange={({ name, value }) => changeHandler({ name, value })}
      />
      <MyDatePicker
        name="toDate"
        value={formData?.toDate}
        label="To date"
        onChange={({ name, value }) => changeHandler({ name, value })}
      />
    </div>
  );
};

export default DateFilter;

import MyDatePicker from "../elements/CustomDatePicker";
import classes from "../../styles/DateFilter.module.css";

const DateFilter = () => {
  return (
    <div id="connnnn" className={classes.container}>
      <MyDatePicker label="Start Date" />
      <MyDatePicker label="End Date" />
    </div>
  );
};

export default DateFilter;

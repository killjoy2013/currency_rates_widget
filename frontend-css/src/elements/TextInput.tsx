import classes from "../../styles/Widget.module.css";
import { CurrencyItemType } from "../components/ExchangeForm";

type TextInputProps = {
  label: string;
  value: number;
  onChange?: (e: string) => void;
};

const TextInput = (props: TextInputProps) => {
  const { label, value, onChange } = props;
  const changeHandler = (amount: string) => {
    onChange && onChange(amount);
  };

  const displayValue = value == 0 ? "" : String(value);

  return (
    <div className={classes.formItem}>
      <span className={classes.formLabel}>{label}</span>
      <input
        className={classes.formInput}
        value={displayValue}
        onChange={(event) => changeHandler(event.target.value)}
      />
    </div>
  );
};

export default TextInput;

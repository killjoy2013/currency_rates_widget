import classes from "../../styles/Widget.module.css";
import { CurrencyItemType } from "../components/ExchangeForm";

type TextInputProps = {
  label: string;
  value: number;
  currencyItem?: CurrencyItemType;
  onChange?: (e: string) => void;
};

const TextInput = (props: TextInputProps) => {
  const { label, value, currencyItem, onChange } = props;

  const changeHandler = (amount: string) => {
    onChange && onChange(amount);
  };

  const getDisplayText = () => {
    if (value == 0) {
      return "";
    } else if (currencyItem) {
      let formatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyItem.abbr,
      });

      return formatter.format(value);
    } else {
      return String(value);
    }
  };

  return (
    <div className={classes.formElement}>
      <span className={classes.formLabel}>{label}</span>
      <input
        className={classes.textInput}
        value={getDisplayText()}
        onChange={(event) => changeHandler(event.target.value)}
      />
    </div>
  );
};

export default TextInput;

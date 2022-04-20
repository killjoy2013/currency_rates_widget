import styles from "../../styles/TextInput.module.css";
import genericStyles from "../../styles/Generic.module.css";

import { CurrencyItemType } from "../components/ExchangeForm";
import { FunctionComponent, useState, useEffect } from "react";
import { getCurrencyDisplayText } from "../helpers/TextHelpers";

interface TextInputProps {
  label: string;
  value: number;
  currencyItem?: CurrencyItemType;
  onChange?: (e: string) => void;
}

const TextInput: FunctionComponent<TextInputProps> = ({
  label,
  value,
  currencyItem,
  onChange,
}) => {
  const changeHandler = (amount: string) => {
    onChange && onChange(amount);
  };

  const [hasFocus, setHasFocus] = useState(false);

  return (
    <div className={genericStyles.formElement}>
      <span className={genericStyles.formLabel}>{label}</span>
      <input
        className={styles.textInput}
        value={
          hasFocus
            ? value
            : getCurrencyDisplayText(value, currencyItem?.abbr as string)
        }
        onChange={(event) => changeHandler(event.target.value)}
        onFocus={(event) => setHasFocus((prev) => !prev)}
        onBlur={(event) => setHasFocus((prev) => !prev)}
      />
    </div>
  );
};

export default TextInput;

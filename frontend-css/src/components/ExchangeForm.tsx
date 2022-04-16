import classes from "../../styles/Widget.module.css";
import Button from "../elements/Button";
import Select from "../elements/Select";
import TextInput from "../elements/TextInput";

const ExchangeForm = () => {
  return (
    <div className={classes.form}>
      <Select label="Currency from">
        <option>ETH - Ethereum</option>
        <option>XRP - Ripple</option>
        <option>LTC - Litcoin</option>
      </Select>
      <TextInput label="Amount" />
      <span className={classes.equal}>=</span>
      <Select label="Currency to">
        <option>EUR - Euro</option>
        <option>USD - American Dollar</option>
        <option>GBP - Pound sterling</option>
        <option>CAD - Canadian Dollar</option>
      </Select>
      <TextInput label="Amount" />
      <Button label="Save" />
    </div>
  );
};

export default ExchangeForm;

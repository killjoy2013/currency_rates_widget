import classes from "../../styles/Widget.module.css";

type TextInputProps = {
  label: string;
};

const TextInput = (props: TextInputProps) => {
  const { label } = props;
  return (
    <div className={classes.formItem}>
      <span className={classes.formLabel}>{label}</span>
      <input className={classes.formInput} />
    </div>
  );
};

export default TextInput;

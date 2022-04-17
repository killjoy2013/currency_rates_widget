import classes from "../../styles/Widget.module.css";

type ButtonProps = {
  label: string;
};

const Button = (props: ButtonProps) => {
  const { label } = props;
  return (
    <button className={`${classes.button} ${classes.formElement}`}>
      {label}
    </button>
  );
};

export default Button;

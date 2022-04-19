import styles from "../../styles/Button.module.css";

type ButtonProps = {
  label: string;
};

const Button = (props: ButtonProps) => {
  const { label } = props;
  return (
    <button className={`${styles.button} ${styles.formElement}`}>
      {label}
    </button>
  );
};

export default Button;

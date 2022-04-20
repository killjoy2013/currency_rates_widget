import { FunctionComponent } from "react";
import clsx from "clsx";
import styles from "../../styles/Button.module.css";

type ButtonProps = {
  label: string;
  variant: "filled" | "outlined";
  className?: string;
  onClick: () => void;
};

const Button: FunctionComponent<ButtonProps> = ({
  onClick,
  label,
  variant,
  className,
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles.formElement,
        variant == "filled" && styles.filled,
        variant == "outlined" && styles.outlined,
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;

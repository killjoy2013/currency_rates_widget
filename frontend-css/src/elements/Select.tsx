import React from "react";
import styles from "../../styles/Select.module.css";

type SelectProps = {
  label: string;
};

const Select = (props: SelectProps) => {
  const { label } = props;
  return (
    <div className={styles.formElements}>
      <span className={styles.formLabel}>{label}</span>
      <select name="" className={styles.selectInput} id="">
        <option>OPtion 1</option>
        <option>OPtion 2</option>
      </select>
    </div>
  );
};

export default Select;

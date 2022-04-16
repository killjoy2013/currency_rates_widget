import classes from "../../styles/Widget.module.css";

type SelectProps = {
  children: React.ReactNode;
  label: string;
};

const Select = (props: SelectProps) => {
  const { children, label } = props;

  return (
    <div className={classes.formItem}>
      <span className={classes.formLabel}>{label}</span>
      <select className={classes.formInput}>{children}</select>
    </div>
  );
};

export default Select;

import { useEffect, useRef } from "react";
import styles from "../../../styles/DropDown.module.css";

export interface RowProps<T> {
  data: T;
}

interface DropDownModalProps<T> {
  items: T[];
  Row: (props: RowProps<T>) => JSX.Element;
  onChange: (e: T) => void;
  closeModal: () => void;
}

function DropDownModal<T>(props: DropDownModalProps<T>) {
  const { items, Row, onChange, closeModal } = props;

  const ref = useRef<any>(null);

  const changeHandler = (item: T) => {
    closeModal();
    onChange(item);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        closeModal();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [closeModal]);

  return (
    <div id="list-items" ref={ref} className={`${styles.selectList}`}>
      {items.map((data, i) => (
        <div
          key={i}
          className={styles.selectItem}
          onClick={changeHandler.bind(null, data)}
        >
          <Row data={data} />
        </div>
      ))}
    </div>
  );
}

export default DropDownModal;

import { useEffect, useRef } from "react";
import Image from "next/image";
import classes from "../../../styles/Widget.module.css";
import { CurrencyItemType } from "../ExchangeForm";

type SelectModalProps = {
  items: CurrencyItemType[];
  onChange: (e: CurrencyItemType) => void;
  closeModal: () => void;
};

const SelectModal = (props: SelectModalProps) => {
  const { items, onChange, closeModal } = props;
  const ref = useRef<any>(null);

  const changeHandler = (item: CurrencyItemType) => {
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
    <div id="list-items" ref={ref} className={`${classes.selectList}`}>
      {items.map((data) => (
        <div
          key={data.abbr}
          className={classes.selectItem}
          onClick={changeHandler.bind(null, data)}
        >
          <Image src={`/icons/${data.abbr}.svg`} width={36} height={16} />
          <div>{`${data.abbr} - ${data.name}`}</div>
        </div>
      ))}
    </div>
  );
};

export default SelectModal;

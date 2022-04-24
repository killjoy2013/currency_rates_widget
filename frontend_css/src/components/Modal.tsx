import React, { FunctionComponent, ReactNode, useState } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";
import styles from "../../styles/Modal.module.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Modal: FunctionComponent<ModalProps> = ({
  onClose,
  show,
  children,
  title,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const closeHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <span>{title}</span>

          <a href="#" onClick={closeHandler}>
            <GrClose />
          </a>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root") as HTMLElement
    );
  } else {
    return null;
  }
};

export default Modal;

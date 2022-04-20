import moment from "moment";
import styles from "../../styles/SummaryModal.module.css";

interface SummaryModalProps {
  close: () => void;
  date: Date;
  status: string;
  from: string;
  to: string;
  totalAmount: number;
}

const SummaryModal = (props: SummaryModalProps) => {
  const { close, date, status, from, to, totalAmount } = props;
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>Exchange</div>
          <div className={styles.titleCloseBtn}>
            <button
              onClick={() => {
                close();
              }}
            >
              X
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <div>Date & Time </div>
          <div>{moment(date).format("DD/mm/yyyy HH:mm")} </div>
          <div>Status </div>
          <div>{status}</div>
          <div>From </div>
          <div>{from}</div>
          <div>To </div>
          <div>{to}</div>
          <div>Total Amount </div>
          <div>{totalAmount}</div>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => {
              close();
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;

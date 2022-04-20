import CustomDatePicker from "../elements/CustomDatePicker";
import styles from "../../styles/DateFilter.module.css";
import { useState } from "react";
import DropDown from "../elements/DropDown";

type FormData = {
  fromDate: Date;
  toDate: Date;
  type: "All" | "Exchanged" | "Live Price";
};

const DateFilter = () => {
  const [formData, setFormData] = useState<FormData>({
    fromDate: new Date(),
    toDate: new Date(),
    type: "All",
  });

  const TypeRow = ({ data }: { data: string }) => <div>{`${data}`}</div>;
  const TypeSelect = ({ data }: { data: string }) => <div>{`${data}`}</div>;

  return (
    <div className={styles.container}>
      <CustomDatePicker
        name="fromDate"
        value={formData?.fromDate}
        label="From date"
        onChange={({ value }) =>
          setFormData((prev) => ({ ...prev, fromDate: value }))
        }
      />
      <CustomDatePicker
        name="toDate"
        value={formData?.toDate}
        label="To date"
        onChange={({ value }) =>
          setFormData((prev) => ({ ...prev, toDate: value }))
        }
      />
      <DropDown<"All" | "Exchanged" | "Live Price">
        name="currency-to"
        Row={TypeRow}
        Selected={TypeSelect}
        value={formData.type}
        label="Type"
        items={["All", "Exchanged", "Live Price"]}
        onChange={(type) => setFormData((prev) => ({ ...prev, type }))}
      />
    </div>
  );
};

export default DateFilter;

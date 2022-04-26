import { useReactiveVar } from "@apollo/client";
import { HandlerContext } from "@src/contexts/HandlerContext";
import { PriceType } from "@src/generated/graphql";
import { filterFormDataVar } from "@src/lib/cache";
import React, { useContext } from "react";
import styles from "../../styles/DateFilter.module.css";
import Button from "../elements/Button";
import CustomDatePicker from "../elements/CustomDatePicker";
import DropDown from "../elements/DropDown";

/*
DateFilter will be placed inside ExchangeList component
Basically it's a form to query data.
It's data is maintained in apollo client cache reactive variable filterFormDataVar
which can be accessed from everywhere inside the app.
onChange method of each element updates filterFormDataVar in the cache
*/

const DateFilter = () => {
  //useReactiveVar is to trigger re render when filterFormDataVar value changes
  const filterFormData = useReactiveVar(filterFormDataVar);
  //we're getting common functions like handlers from a page wide HandlerContext
  const { queryHandler } = useContext(HandlerContext);

  const TypeRow = ({ data }: { data: string }) => <div>{`${data}`}</div>;
  const TypeSelect = ({ data }: { data: string }) => <div>{`${data}`}</div>;

  return (
    <div className={styles.container}>
      <CustomDatePicker
        name="fromDate"
        value={filterFormData.fromDate}
        label="From date"
        //we're interested in only date part. So, need to set time part to zero
        onChange={({ value }) =>
          filterFormDataVar({
            ...filterFormDataVar(),
            fromDate: new Date(
              value.getFullYear(),
              value.getMonth(),
              value.getDate(),
              0,
              0,
              0,
              0
            ),
          })
        }
      />
      <CustomDatePicker
        name="toDate"
        value={filterFormData.toDate}
        label="To date"
        onChange={({ value }) =>
          filterFormDataVar({
            ...filterFormDataVar(),
            toDate: new Date(
              value.getFullYear(),
              value.getMonth(),
              value.getDate(),
              0,
              0,
              0,
              0
            ),
          })
        }
      />
      <DropDown<PriceType>
        className={styles.type}
        name="type"
        Row={TypeRow}
        Selected={TypeSelect}
        value={filterFormData.type as PriceType}
        label="Type"
        items={[PriceType.All, PriceType.Exchanged, PriceType.LivePrice]}
        onChange={(type) =>
          filterFormDataVar({ ...filterFormDataVar(), type: type })
        }
      />
      <Button label="Filter" variant="outlined" onClick={queryHandler} />
    </div>
  );
};

export default DateFilter;

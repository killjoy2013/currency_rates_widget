import React, { useState } from "react";
import classes from "../../../styles/RateList.module.css";

import { RiSortAsc, RiSortDesc } from "react-icons/ri";

const RateListDesktop = () => {
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  return (
    <div className={classes.desktop}>
      <div className={classes.titleSmall}>History</div>
      <table className={classes.table}>
        <thead>
          <td
            className={`${classes.th} ${classes.sort}`}
            onClick={() => setSortAsc((prev) => !prev)}
          >
            {sortAsc ? <RiSortAsc /> : <RiSortDesc />}
            <span>Date & Time</span>
          </td>
          <td className={classes.th}>Currency From</td>
          <td className={classes.th}>Amount1</td>
          <td className={classes.th}>Currency To</td>
          <td className={classes.th}>Amount2</td>
          <td className={classes.th}>Type</td>
        </thead>
        <tbody>
          <tr className={classes.tr}>
            <td className={classes.td}>22/01/2020 20:55</td>
            <td className={classes.td}>Bitcoin</td>
            <td className={classes.td}>1</td>
            <td className={classes.td}>USD</td>
            <td className={classes.td}>48.000,00</td>
            <td className={`${classes.td} ${classes.livePrice}`}>Live Price</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td}>22/01/2020 20:55</td>
            <td className={classes.td}>Bitcoin</td>
            <td className={classes.td}>2</td>
            <td className={classes.td}>EUR</td>
            <td className={classes.td}>56.000,00</td>
            <td className={`${classes.td} ${classes.exchanged}`}>Exchanged</td>
          </tr>
          <tr className={classes.tr}>
            <td className={classes.td}>25/04/2020 20:55</td>
            <td className={classes.td}>Bitcoin</td>
            <td className={classes.td}>2</td>
            <td className={classes.td}>EUR</td>
            <td className={classes.td}>56.000,00</td>
            <td className={`${classes.td} ${classes.exchanged}`}>Exchanged</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RateListDesktop;

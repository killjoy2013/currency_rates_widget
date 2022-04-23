import React from "react";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import styles from "@styles/Pagination.module.css";
import { useState, useCallback } from "react";

type PageItemProp = {
  pageNo: number;
  activePageNo: number;
  onChange: (pageToGo: number) => void;
  onPageChange: (activePage: number) => void;
};
const PageItem: React.FunctionComponent<PageItemProp> = ({
  pageNo,
  activePageNo,
  onChange,
  onPageChange,
}) => {
  let active = pageNo == activePageNo ? styles.active : "";

  return (
    <div
      className={`${styles.pageItem} ${active}`}
      onClick={() => {
        onChange(pageNo);
        onPageChange(pageNo);
      }}
    >
      {pageNo}
    </div>
  );
};

const Dots = () => {
  return (
    <div key="dots" className={styles.pageItem}>
      ...
    </div>
  );
};

type PaginationProp = {
  totalNumber: number;
  onPageChange: (activePage: number) => void;
};

const Pagination: React.FunctionComponent<PaginationProp> = ({
  totalNumber,
  onPageChange,
}) => {
  const [activePage, setActivePage] = useState(1);

  const Next = useCallback(() => {
    return (
      <div
        key="next"
        className={styles.nextPrev}
        onClick={() => {
          if (activePage < totalNumber) {
            onPageChange(activePage + 1);
            setActivePage((prev) => ++prev);
          }
        }}
      >
        <div>Next</div>
        <BiRightArrowAlt />
      </div>
    );
  }, [activePage, totalNumber, onPageChange]);

  const Previous = useCallback(() => {
    return (
      <div
        key="prev"
        className={styles.nextPrev}
        onClick={() => {
          if (activePage > 0) {
            onPageChange(activePage - 1);
            setActivePage((prev) => --prev);
          }
        }}
      >
        <BiLeftArrowAlt />
        <div>Previous</div>
      </div>
    );
  }, [activePage, onPageChange]);

  const renderMaxFive = useCallback(
    (maxNumber: number, activePageNo: number) => {
      const result: JSX.Element[] = [];
      for (let i = 0; i < maxNumber; i++) {
        result.push(
          <PageItem
            key={i}
            pageNo={i + 1}
            activePageNo={activePageNo}
            onChange={setActivePage}
            onPageChange={onPageChange}
          />
        );
      }
      return result;
    },
    [onPageChange]
  );

  const renderMoreThanFive = useCallback(
    (maxNumber: number, activePageNo: number) => {
      const result: JSX.Element[] = [];
      for (let i = 0; i < 3; i++) {
        result.push(
          <PageItem
            key={i}
            pageNo={i + 1}
            activePageNo={activePageNo}
            onChange={setActivePage}
            onPageChange={onPageChange}
          />
        );
      }
      result.push(<Dots key="dots" />);
      result.push(
        <PageItem
          key={maxNumber}
          pageNo={maxNumber}
          activePageNo={activePageNo}
          onChange={setActivePage}
          onPageChange={onPageChange}
        />
      );
      return result;
    },
    []
  );

  let result: JSX.Element[] = [];
  result.push(<Previous key="prev" />);
  if (totalNumber <= 5) {
    result = [...result, ...renderMaxFive(totalNumber, activePage)];
  } else {
    result = [...result, ...renderMoreThanFive(totalNumber, activePage)];
  }

  result.push(<Next key="next" />);

  return <div className={styles.container}>{result.map((m) => m)}</div>;
};

export default Pagination;

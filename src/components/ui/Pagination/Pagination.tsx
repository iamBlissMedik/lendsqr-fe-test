"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  total: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
}

export default function Pagination({
  pageIndex,
  pageSize,
  total,
  setPageIndex,
  setPageSize,
}: PaginationProps) {
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationLeft}>
        <span>Showing</span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>out of {total}</span>
      </div>

      <div className={styles.paginationRight}>
        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
        >
          <FaChevronLeft />
        </button>

        {Array.from({ length: pageCount }, (_, i) => i).map((page) => {
          const current = pageIndex;
          if (
            page === 0 ||
            page === pageCount - 1 ||
            (page >= current - 1 && page <= current + 1)
          ) {
            return (
              <button
                key={page}
                className={current === page ? styles.current : ""}
                onClick={() => setPageIndex(page)}
              >
                {page + 1}
              </button>
            );
          } else if (page === current - 2 || page === current + 2) {
            return (
              <span className={styles.ellipsis} key={page}>
                ...
              </span>
            );
          }
          return null;
        })}

        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex === pageCount - 1}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

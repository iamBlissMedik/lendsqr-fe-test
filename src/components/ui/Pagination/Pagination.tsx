"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSizeChange = (size: number) => {
    setPageSize(size);
    setIsOpen(false);
  };

  return (
    <nav
      className={styles["pagination-container"]}
      aria-label="Pagination navigation"
    >
      <div className={styles["pagination-left"]}>
        <span>Showing</span>

        {/* Custom Dropdown */}
        <div className={styles["custom-select"]} ref={dropdownRef}>
          <button
            className={styles["select-button"]}
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label="Items per page"
            type="button"
          >
            {pageSize}
            <FaChevronDown
              className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
            />
          </button>

          {isOpen && (
            <ul className={styles["select-dropdown"]} role="listbox">
              {[10, 25, 50, 100].map((size) => (
                <li
                  key={size}
                  role="option"
                  aria-selected={pageSize === size}
                  className={pageSize === size ? styles.selected : ""}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </li>
              ))}
            </ul>
          )}
        </div>

        <span>out of 100</span>
      </div>

      <div className={styles["pagination-right"]}>
        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
          aria-label="Previous page"
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
                aria-label={`Page ${page + 1}`}
                aria-current={current === page ? "page" : undefined}
              >
                {page + 1}
              </button>
            );
          } else if (page === current - 2 || page === current + 2) {
            return (
              <span className={styles.ellipsis} key={page} aria-hidden="true">
                ...
              </span>
            );
          }
          return null;
        })}

        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex === pageCount - 1}
          aria-label="Next page"
        >
          <FaChevronRight />
        </button>
      </div>
    </nav>
  );
}

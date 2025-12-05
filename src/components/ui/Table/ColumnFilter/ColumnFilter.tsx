"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { IoFilter } from "react-icons/io5";
import styles from "./ColumnFilter.module.scss";
import Button from "../../Button/Button";

interface ColumnFilterProps {
  children: ReactNode; // The filter content
  onApply?: () => void; // Optional callback when filter is applied
  onReset?: () => void; // Optional callback when filter is reset
  showButtons?: boolean; // Show Reset/Filter buttons (default: true)
}

export default function ColumnFilter({
  children,
  onApply,
  onReset,
  showButtons = true,
}: ColumnFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleReset = () => {
    onReset?.();
    setIsOpen(false);
  };

  const handleApply = () => {
    onApply?.();
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        ref={triggerRef}
        className={`${styles.trigger} ${isOpen ? styles.active : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="Filter"
      >
        <IoFilter />
      </button>

      {isOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          <div className={styles.content}>{children}</div>

          {showButtons && (
            <div className={styles.actions}>
              <Button onClick={handleReset} variant="outlined">Reset</Button>
              <Button onClick={handleApply}>Filter</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

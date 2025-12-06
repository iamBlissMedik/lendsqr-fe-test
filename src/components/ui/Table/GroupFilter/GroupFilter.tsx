"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { IoFilter } from "react-icons/io5";
import styles from "./GroupFilter.module.scss";
import Button from "../../Button/Button";

export interface FilterField {
  label: string;
  name: string;
  type: "text" | "select" | "date" | "email" | "tel" | "custom";
  options?: { value: string; label: string }[]; // For select type
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;
  customContent?: ReactNode; // For custom type
}

interface GroupFilterProps {
  fields: FilterField[];
  onApply: () => void;
  onReset: () => void;
  triggerText?: string;
  triggerIcon?: ReactNode;
}

export default function GroupFilter({
  fields,
  onApply,
  onReset,
  triggerText = "Filter",
  triggerIcon = <IoFilter />,
}: GroupFilterProps) {
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
    onReset();
    setIsOpen(false);
  };

  const handleApply = () => {
    onApply();
    setIsOpen(false);
  };

  const renderField = (field: FilterField) => {
    if (field.type === "custom" && field.customContent) {
      return field.customContent;
    }

    if (field.type === "select") {
      return (
        <select
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
          className={styles.input}
        >
          <option value="">Select</option>
          {field.options?.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type}
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        placeholder={field.placeholder || field.label}
        className={styles.input}
      />
    );
  };

  return (
    <div className={styles.wrapper}>
      <button
        ref={triggerRef}
        className={`${styles.trigger} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {triggerIcon}
        {triggerText && <span>{triggerText}</span>}
      </button>

      {isOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          <div className={styles.content}>
            <div className={styles.grid}>
              {fields.map((field) => (
                <div key={field.name} className={styles.field}>
                  <label className={styles.label}>{field.label}</label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <Button onClick={handleReset} variant="outlined">
              Reset
            </Button>
            <Button onClick={handleApply}>Filter</Button>
          </div>
        </div>
      )}
    </div>
  );
}

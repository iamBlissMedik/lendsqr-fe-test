"use client";
import React from "react";
import styles from "./InputField.module.scss";

interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}) => (
  <div className={styles["input-container"]}>
    {label && <label className={styles.label}>{label}</label>}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={error ? styles["input-error"] : ""}
    />
    {error && <p className={styles.error}>{error}</p>}
  </div>
);

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
}) => {
  const inputId = `input-${
    label?.toLowerCase().replace(/\s/g, "-") || "field"
  }`;
  const errorId = `${inputId}-error`;

  return (
    <div className={styles["input-container"]}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={error ? styles["input-error"] : ""}
      />
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

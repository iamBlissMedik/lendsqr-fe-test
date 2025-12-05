"use client";
import React, { useState } from "react";
import styles from "./InputField.module.scss";

interface PasswordFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles["input-container"]}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles["password-wrapper"]}>
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={error ? styles["input-error"] : ""}
        />
        <span className={styles.toggle} onClick={() => setShow(!show)}>
          {show ? "HIDE" : "SHOW"}
        </span>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

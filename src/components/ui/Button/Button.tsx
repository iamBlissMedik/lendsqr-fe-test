"use client";

import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  borderColor?: string;
  textColor?: string;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "filled",
  borderColor,
  textColor,
  fullWidth = false,
  style,
  loading = false,
  disabled,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
  ].join(" ");

  const customStyle: React.CSSProperties = {
    borderColor,
    color: textColor,
    ...style,
  };

  return (
    <button
      className={classNames}
      style={customStyle}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <span className={styles.spinner}></span>}
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default Button;

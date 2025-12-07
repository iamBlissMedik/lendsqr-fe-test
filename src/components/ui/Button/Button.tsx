"use client";

import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  borderColor?: string;
  textColor?: string;
  fullWidth?: boolean;
  loading?: boolean;
  ariaLabel?: string;
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
  ariaLabel,
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
      aria-busy={loading}
      aria-label={ariaLabel}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true"></span>}
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default Button;

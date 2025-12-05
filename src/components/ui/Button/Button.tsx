"use client";

import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  borderColor?: string;
  textColor?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "filled",
  borderColor,
  textColor,
  fullWidth = false,
  style,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
  ].join(" ");

  // Inline style for dynamic colors
  const customStyle: React.CSSProperties = {
    borderColor: borderColor,
    color: textColor,
    ...style,
  };

  return (
    <button className={classNames} style={customStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;

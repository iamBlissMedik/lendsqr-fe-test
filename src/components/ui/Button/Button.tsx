"use client";

import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

/**
 * Button component props interface
 * @interface ButtonProps
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 * 
 * @property {("filled" | "outlined")} [variant="filled"] - Button style variant
 * @property {string} [borderColor] - Custom border color (CSS color value)
 * @property {string} [textColor] - Custom text color (CSS color value)
 * @property {boolean} [fullWidth=false] - Whether button should take full width
 * @property {boolean} [loading=false] - Show loading spinner and disable interaction
 * @property {string} [ariaLabel] - Accessibility label for screen readers
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  borderColor?: string;
  textColor?: string;
  fullWidth?: boolean;
  loading?: boolean;
  ariaLabel?: string;
}

/**
 * Reusable Button Component
 * 
 * Displays a clickable button with support for loading states, variants, and accessibility.
 * Automatically disables during loading to prevent multiple submissions.
 * 
 * Features:
 * - Two style variants: filled (default) and outlined
 * - Loading state with spinner animation
 * - Customizable colors (border, text)
 * - Full width option
 * - Accessibility support (aria-busy, aria-label)
 * - Keyboard navigation support
 * 
 * @component
 * @example
 * // Basic button
 * <Button>Click Me</Button>
 * 
 * @example
 * // Outlined button with custom color
 * <Button variant="outlined" borderColor="#39cdcc">
 *   Submit
 * </Button>
 * 
 * @example
 * // Loading state
 * <Button loading={isSubmitting} disabled={!isFormValid}>
 *   {isSubmitting ? "Submitting..." : "Submit Form"}
 * </Button>
 * 
 * @example
 * // Full width with accessibility label
 * <Button fullWidth ariaLabel="Submit login form">
 *   Log In
 * </Button>
 * 
 * @param props - Button component props
 * @returns Rendered button element with loading and styling options
 */
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

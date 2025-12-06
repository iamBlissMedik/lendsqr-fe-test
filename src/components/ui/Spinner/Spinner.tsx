"use client";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size?: number;
  fullscreen?: boolean; // optional prop if you want it full screen
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, fullscreen = false }) => {
  return (
    <div
      className={styles.spinnerWrapper}
      style={fullscreen ? { height: "100vh" } : undefined}
    >
      <AiOutlineLoading3Quarters className={styles.spinner} size={size} />
    </div>
  );
};

export default Spinner;

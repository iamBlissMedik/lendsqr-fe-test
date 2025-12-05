"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import styles from "./RowActions.module.scss";

export interface RowAction {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
}

interface RowActionsProps {
  actions: RowAction[];
  triggerIcon?: ReactNode;
}

export default function RowActions({
  actions,
  triggerIcon = <FaEllipsisVertical />,
}: RowActionsProps) {
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

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Actions"
      >
        {triggerIcon}
      </button>

      {isOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {actions.map((action, index) => (
            <button
              key={index}
              className={`${styles.item} ${action.className || ""}`}
              onClick={() => handleAction(action.onClick)}
            >
              {action.icon && (
                <span className={styles.icon}>{action.icon}</span>
              )}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";
import { ReactNode } from "react";
import Image from "next/image";
import styles from "./AuthLayout.module.scss";

export default function AuthLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={174}
          height={36}
          className={styles["logo-img"]}
        />
      </header>

      <section className={styles.content}>{children}</section>
    </main>
  );
}

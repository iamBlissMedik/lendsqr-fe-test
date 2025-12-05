"use client";

import { ReactNode } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./DashboardLayout.module.scss";

export default function DashboardLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.layout}>
      {/* Top Navbar */}
      <Navbar />

      {/* Sidebar + Page Content */}
      <div className={styles.body}>
        <Sidebar />

        <main className={styles.content}>
          <div className={styles.inner}>{children}</div>
        </main>
      </div>
    </div>
  );
}

"use client";

import styles from "./Table.module.scss";
import Pagination from "../Pagination/Pagination";
import { IoFilter } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export interface Column {
  header?: string;
  accessor?: string;
  render?: (row: any) => React.ReactNode;
  filterable?: boolean;
}

interface TableProps {
  columns: Column[];
  data: any[];
  loading: boolean;
  total: number;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
}

export default function Table({
  columns,
  data,
  loading,
  total,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
}: TableProps) {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th key={i}>
                    {col.header && (
                      <div className={styles.headerWithIcon}>
                        <span>{col.header}</span>
                        {col.filterable && (
                          <IoFilter className={styles.filterIcon} />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className={styles.loading}>
                    <AiOutlineLoading3Quarters className={styles.spinner} />
                  </td>
                </tr>
              ) : data.length ? (
                data.map((row, i) => (
                  <tr key={i}>
                    {columns.map((col, j) => (
                      <td key={j}>
                        {col.render ? col.render(row) : row[col.accessor || ""]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className={styles.loading}>
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
        total={total}
      />
    </div>
  );
}

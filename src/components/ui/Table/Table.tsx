"use client";

import styles from "./Table.module.scss";
import Pagination from "../Pagination/Pagination";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ColumnFilter from "./ColumnFilter/ColumnFilter";
import { ReactNode } from "react";
import Spinner from "../Spinner/Spinner";

export interface Column {
  header?: string;
  accessor?: string;
  render?: (row: any) => React.ReactNode;
  filterable?: boolean;
  filterContent?: React.ReactNode;
  onFilterApply?: () => void;
  onFilterReset?: () => void;
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
  groupFilter?: ReactNode; // Optional group filter component
  showIndividualFilters?: boolean; // Show individual column filters (default: true)
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
  groupFilter,
  showIndividualFilters = true,
}: TableProps) {
  return (
    <div className={styles.tableWrapper}>
      {groupFilter && (
        <div className={styles.groupFilterWrapper}>{groupFilter}</div>
      )}

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
                        {showIndividualFilters && col.filterable && (
                          <ColumnFilter
                            onApply={col.onFilterApply}
                            onReset={col.onFilterReset}
                          >
                            {col.filterContent || (
                              <div>No filter configured</div>
                            )}
                          </ColumnFilter>
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
                    <Spinner />
                  </td>
                </tr>
              ) : data.length ? (
                data.map((row, i) => (
                  <tr key={i}>
                    {columns.map((col, j) => (
                      <td
                        key={j}
                        className={col.render ? styles.actionsCell : undefined}
                      >
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

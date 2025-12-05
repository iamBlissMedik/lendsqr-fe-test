"use client";

import { useState, useEffect } from "react";
import { generateUsers } from "@/lib/mockData";
import Table, { Column } from "@/components/ui/Table/Table";
import styles from "@/components/ui/Table/Table.module.scss";
import { FaEllipsisVertical } from "react-icons/fa6";
export default function UsersTable() {
  const dataSource = generateUsers();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return {
          color: "#39CD62",
          backgroundColor: "rgba(57, 205, 98, 0.06)",
        };
      case "inactive":
        return {
          color: "#545F7D",
          backgroundColor: "rgba(84, 95, 125, 0.06)",
        };
      case "pending":
        return {
          color: "#E9B200",
          backgroundColor: "rgba(233, 178, 0, 0.06)",
        };
      case "blacklisted":
        return {
          color: "#E4033B",
          backgroundColor: "rgba(228, 3, 59, 0.06)",
        };
      default:
        return {};
    }
  };

  const columns: Column[] = [
    { header: "Organization", accessor: "organization", filterable: true },
    { header: "Username", accessor: "username", filterable: true },
    { header: "Email", accessor: "email", filterable: true },
    { header: "Phone Number", accessor: "phone", filterable: true },
    { header: "Date Joined", accessor: "dateJoined", filterable: true,},
    {
      header: "Status",
      accessor: "status",
      render: (row) => {
        const statusClass = row.status.toLowerCase();
        return (
          <span className={`${styles.status} ${styles[statusClass]}`}>
            {row.status}
          </span>
        );
      },
      filterable: true,
    },
    {
      render: () => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FaEllipsisVertical style={{ cursor: "pointer" }} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const start = pageIndex * pageSize;
      const end = start + pageSize;
      setData(dataSource.slice(start, end));
      setTotal(dataSource.length);
      setLoading(false);
    }, 200); // simulate API delay

    return () => clearTimeout(timer);
  }, [pageIndex, pageSize]);

  return (
    <Table
      columns={columns}
      data={data}
      loading={loading}
      total={total}
      pageIndex={pageIndex}
      pageSize={pageSize}
      setPageIndex={setPageIndex}
      setPageSize={setPageSize}
    />
  );
}

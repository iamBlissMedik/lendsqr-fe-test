"use client";

import { useState, useEffect } from "react";
import { generateUsers } from "@/lib/mockData";
import Table, { Column } from "@/components/ui/Table/Table";
import styles from "@/components/ui/Table/Table.module.scss";
import { FaEllipsisVertical } from "react-icons/fa6";
import RowActions, {
  RowAction,
} from "@/components/ui/Table/RowActions/RowActions";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FiUserX } from "react-icons/fi";
import { GrUserExpert } from "react-icons/gr";
export default function UsersTable() {
  const router = useRouter();
  const dataSource = generateUsers();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // ✅ Define actions for each row
  const getUserActions = (row: any): RowAction[] => [
    {
      label: "View Details",
      icon: <IoEyeOutline />,
      onClick: () => router.push(`/details/${row.id}`),
    },
    {
      label: "Blacklist User",
      icon: <FiUserX />,
      onClick: () => alert(`Blacklist ${row.username}`),
    },
    {
      label: "Activate User",
      icon: <GrUserExpert />,
      onClick: () => alert(`Activate ${row.username}`),
    },
  ];

  const columns: Column[] = [
    { header: "Organization", accessor: "organization", filterable: true },
    { header: "Username", accessor: "username", filterable: true },
    { header: "Email", accessor: "email", filterable: true },
    { header: "Phone Number", accessor: "phone", filterable: true },
    { header: "Date Joined", accessor: "dateJoined", filterable: true },
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
      render: (row) => (
        <div className={styles.actionsCell}>
          <RowActions actions={getUserActions(row)} />
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

"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Table, { Column } from "@/components/ui/Table/Table";
import styles from "@/components/ui/Table/Table.module.scss";
import RowActions, {
  RowAction,
} from "@/components/ui/Table/RowActions/RowActions";
import GroupFilter, {
  FilterField,
} from "@/components/ui/Table/GroupFilter/GroupFilter";
import { IoEyeOutline } from "react-icons/io5";
import { FiUserX } from "react-icons/fi";
import { GrUserExpert } from "react-icons/gr";
import { InputField } from "@/components/InputField/InputField";
import { IUser } from "@/types/users.types";
import { saveUser } from "@/lib/indexedDB";

export interface UsersTableProps {
  users: IUser[];
}
export default function UsersTable({users}:UsersTableProps) {
  const router = useRouter();


  const [data, setData] = useState<IUser[]>([]);
  const [filteredData, setFilteredData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Filter states
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    phone: "",
    date: "",
    status: "",
  });

  interface IOption {
    label: string;
    value: string;
  }

  const getOrganizationOptions = (users: IUser[]): IOption[] => {
    const unique = Array.from(new Set(users.map((u) => u.organization)));

    const shuffled = unique.sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 5).map((org) => ({
      label: org,
      value: org,
    }));
  };

  const getUserActions = (row: IUser): RowAction[] => [
    {
      label: "View Details",
      icon: <IoEyeOutline />,
      onClick: async () => {
        // Save the selected user to IndexedDB
        await saveUser(row);
        router.push(`/users/${row.id}`);
      },
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

  // Define filter fields for group filter
  const filterFields: FilterField[] = [
    {
      label: "Organization",
      name: "organization",
      type: "select",
      options: getOrganizationOptions(users),
      value: filters.organization,
      onChange: (value) => setFilters({ ...filters, organization: value }),
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "User",
      value: filters.username,
      onChange: (value) => setFilters({ ...filters, username: value }),
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email",
      value: filters.email,
      onChange: (value) => setFilters({ ...filters, email: value }),
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "tel",
      placeholder: "Phone Number",
      value: filters.phone,
      onChange: (value) => setFilters({ ...filters, phone: value }),
    },
    {
      label: "Date",
      name: "date",
      type: "date",
      value: filters.date,
      onChange: (value) => setFilters({ ...filters, date: value }),
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
        { value: "Pending", label: "Pending" },
        { value: "Blacklisted", label: "Blacklisted" },
      ],
      value: filters.status,
      onChange: (value) => setFilters({ ...filters, status: value }),
    },
  ];

  // Apply filters (works for both group and individual filters)
  const applyFilters = () => {
    if (!users) return;
    let filtered = users;

    if (filters.organization) {
      filtered = filtered.filter((user) =>
        user.organization
          .toLowerCase()
          .includes(filters.organization.toLowerCase())
      );
    }
    if (filters.username) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(filters.username.toLowerCase())
      );
    }
    if (filters.email) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.phone) {
      filtered = filtered.filter((user) => user.phone.includes(filters.phone));
    }
    if (filters.date) {
      filtered = filtered.filter((user) => user.createdAt === filters.date);
    }
    if (filters.status) {
      filtered = filtered.filter((user) => user.status === filters.status);
    }

    setFilteredData(filtered);
    setTotal(filtered.length);
    setPageIndex(0);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      phone: "",
      date: "",
      status: "",
    });
    setFilteredData(users);
    setTotal(users.length);
    setPageIndex(0);
  };

  const columns: Column[] = [
    {
      header: "Organization",
      accessor: "organization",
      filterable: true,
      filterContent: (
        <div className={styles.filterForm}>
          <label>Organization</label>
          <select
            value={filters.organization}
            onChange={(e) =>
              setFilters({ ...filters, organization: e.target.value })
            }
          >
            <option value="">Select</option>
            <option value="Lendsqr">Lendsqr</option>
            <option value="Irorun">Irorun</option>
            <option value="Lendstar">Lendstar</option>
          </select>
        </div>
      ),
      onFilterApply: applyFilters,
      onFilterReset: () => {
        setFilters({ ...filters, organization: "" });
        setTimeout(applyFilters, 0);
      },
    },
    {
      header: "Username",
      accessor: "username",
      filterable: true,
      filterContent: (
        <div className={styles.filterForm}>
          <InputField
            label="Username"
            type="text"
            placeholder="User"
            value={filters.username}
            onChange={(e) => setFilters({ ...filters, username: e })}
          />
        </div>
      ),
      onFilterApply: applyFilters,
      onFilterReset: () => {
        setFilters({ ...filters, username: "" });
        setTimeout(applyFilters, 0);
      },
    },
    {
      header: "Email",
      accessor: "email",
      filterable: true,
      filterContent: (
        <div className={styles.filterForm}>
          <InputField
            label="Email"
            type="email"
            placeholder="Email"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e })}
          />
        </div>
      ),
      onFilterApply: applyFilters,
      onFilterReset: () => {
        setFilters({ ...filters, email: "" });
        setTimeout(applyFilters, 0);
      },
    },
    {
      header: "Phone Number",
      accessor: "phone",
      filterable: true,
      filterContent: (
        <div className={styles.filterForm}>
          <InputField
            label="Phone Number"
            placeholder="Phone Number"
            value={filters.phone}
            onChange={(e) => setFilters({ ...filters, phone: e })}
          />
        </div>
      ),
      onFilterApply: applyFilters,
      onFilterReset: () => {
        setFilters({ ...filters, phone: "" });
        setTimeout(applyFilters, 0);
      },
    },
    {
      header: "Date Joined",
      accessor: "createdAt",
      filterable: true,
      filterContent: (
        <div className={styles.filterForm}>
          <InputField
            label="Date"
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e })}
          />
        </div>
      ),
      onFilterApply: applyFilters,
      onFilterReset: () => {
        setFilters({ ...filters, date: "" });
        setTimeout(applyFilters, 0);
      },
    },
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
      filterContent: (
        <div className={styles.filterForm}>
          <label>Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>
      ),
      onFilterApply: applyFilters,
      onFilterReset: () => {
        setFilters({ ...filters, status: "" });
        setTimeout(applyFilters, 0);
      },
    },
    {
      render: (row) => (
        <div className={styles.actionsCell}>
          <RowActions actions={getUserActions(row)} />
        </div>
      ),
    },
  ];

  // Initialize filteredData when users load
  useEffect(() => {
    if (users) {
      setFilteredData(users);
      setTotal(users.length);
    }
  }, [users]);

  // Handle pagination
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const start = pageIndex * pageSize;
      const end = start + pageSize;
      setData(filteredData.slice(start, end));
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [pageIndex, pageSize, filteredData]);

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
      groupFilter={
        <GroupFilter
          fields={filterFields}
          onApply={applyFilters}
          onReset={handleResetFilters}
        />
      }
      showIndividualFilters={true} // ✅ Enable both group and individual filters
    />
  );
}

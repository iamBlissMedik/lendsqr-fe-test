"use client";

import {
  useState,
  useEffect,
  useMemo,
  useReducer,
  useCallback,
  Reducer,
} from "react";
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

/**
 * UsersTable Component
 * Displays a paginated, filterable table of users with action buttons.
 *
 * Features:
 * - Multi-field filtering (organization, username, email, phone, date, status)
 * - Pagination with configurable page size
 * - Individual column filters and group filter panel
 * - Row actions (view details, blacklist, activate)
 *
 * @param users - Array of user objects to display
 * @returns Rendered table component with filters and pagination
 */

// ✅ Consolidated state interface
interface TableState {
  data: IUser[];
  filteredData: IUser[];
  loading: boolean;
  total: number;
  pageIndex: number;
  pageSize: number;
  filters: {
    organization: string;
    username: string;
    email: string;
    phone: string;
    date: string;
    status: string;
  };
}

// ✅ Action types for useReducer
type TableAction =
  | { type: "SET_FILTERED_DATA"; payload: IUser[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PAGE_INDEX"; payload: number }
  | { type: "SET_PAGE_SIZE"; payload: number }
  | { type: "SET_FILTER"; payload: { key: string; value: string } }
  | { type: "RESET_FILTERS" }
  | { type: "SET_DATA"; payload: IUser[] };

// ✅ Reducer function for consolidated state
const tableReducer: Reducer<TableState, TableAction> = (state, action) => {
  switch (action.type) {
    case "SET_FILTERED_DATA":
      return {
        ...state,
        filteredData: action.payload,
        total: action.payload.length,
        pageIndex: 0, // Reset to first page
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_PAGE_INDEX":
      return { ...state, pageIndex: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload, pageIndex: 0 };
    case "SET_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.key]: action.payload.value,
        },
      };
    case "RESET_FILTERS":
      return {
        ...state,
        filters: {
          organization: "",
          username: "",
          email: "",
          phone: "",
          date: "",
          status: "",
        },
      };
    case "SET_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const initialState: TableState = {
  data: [],
  filteredData: [],
  loading: false,
  total: 0,
  pageIndex: 0,
  pageSize: 10,
  filters: {
    organization: "",
    username: "",
    email: "",
    phone: "",
    date: "",
    status: "",
  },
};

interface IOption {
  label: string;
  value: string;
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const [state, dispatch] = useReducer(tableReducer, initialState);

  // ✅ Memoized function to get organization options
  const getOrganizationOptions = useCallback((data: IUser[]): IOption[] => {
    const unique = Array.from(new Set(data.map((u) => u.organization)));
    const shuffled = unique.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5).map((org) => ({
      label: org,
      value: org,
    }));
  }, []);

  // ✅ Memoized function to get user actions
  const getUserActions = useCallback(
    (row: IUser): RowAction[] => [
      {
        label: "View Details",
        icon: <IoEyeOutline />,
        onClick: async () => {
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
    ],
    [router]
  );

  // ✅ Memoized organization options
  const organizationOptions = useMemo(
    () => getOrganizationOptions(users),
    [users, getOrganizationOptions]
  );

  // ✅ Memoized filter fields
  const filterFields: FilterField[] = useMemo(
    () => [
      {
        label: "Organization",
        name: "organization",
        type: "select",
        options: organizationOptions,
        value: state.filters.organization,
        onChange: (value) =>
          dispatch({
            type: "SET_FILTER",
            payload: { key: "organization", value },
          }),
      },
      {
        label: "Username",
        name: "username",
        type: "text",
        placeholder: "User",
        value: state.filters.username,
        onChange: (value) =>
          dispatch({ type: "SET_FILTER", payload: { key: "username", value } }),
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "Email",
        value: state.filters.email,
        onChange: (value) =>
          dispatch({ type: "SET_FILTER", payload: { key: "email", value } }),
      },
      {
        label: "Phone Number",
        name: "phone",
        type: "tel",
        placeholder: "Phone Number",
        value: state.filters.phone,
        onChange: (value) =>
          dispatch({ type: "SET_FILTER", payload: { key: "phone", value } }),
      },
      {
        label: "Date",
        name: "date",
        type: "date",
        value: state.filters.date,
        onChange: (value) =>
          dispatch({ type: "SET_FILTER", payload: { key: "date", value } }),
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
        value: state.filters.status,
        onChange: (value) =>
          dispatch({ type: "SET_FILTER", payload: { key: "status", value } }),
      },
    ],
    [state.filters, organizationOptions]
  );

  // ✅ Memoized filter application logic
  const applyFilters = useCallback(() => {
    if (!users) return;
    let filtered = users;

    if (state.filters.organization) {
      filtered = filtered.filter((user) =>
        user.organization
          .toLowerCase()
          .includes(state.filters.organization.toLowerCase())
      );
    }
    if (state.filters.username) {
      filtered = filtered.filter((user) =>
        user.username
          .toLowerCase()
          .includes(state.filters.username.toLowerCase())
      );
    }
    if (state.filters.email) {
      filtered = filtered.filter((user) =>
        user.email.toLowerCase().includes(state.filters.email.toLowerCase())
      );
    }
    if (state.filters.phone) {
      filtered = filtered.filter((user) =>
        user.phone.includes(state.filters.phone)
      );
    }
    if (state.filters.date) {
      filtered = filtered.filter(
        (user) => user.createdAt === state.filters.date
      );
    }
    if (state.filters.status) {
      filtered = filtered.filter(
        (user) => user.status === state.filters.status
      );
    }

    dispatch({ type: "SET_FILTERED_DATA", payload: filtered });
  }, [users, state.filters]);

  // ✅ Memoized reset filters function
  const handleResetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
    dispatch({ type: "SET_FILTERED_DATA", payload: users });
  }, [users]);

  // ✅ Memoized columns
  const columns: Column[] = useMemo(
    () => [
      {
        header: "Organization",
        accessor: "organization",
        filterable: true,
        filterContent: (
          <div className={styles.filterForm}>
            <label>Organization</label>
            <select
              value={state.filters.organization}
              onChange={(e) =>
                dispatch({
                  type: "SET_FILTER",
                  payload: { key: "organization", value: e.target.value },
                })
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
          dispatch({
            type: "SET_FILTER",
            payload: { key: "organization", value: "" },
          });
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
              value={state.filters.username}
              onChange={(e) =>
                dispatch({
                  type: "SET_FILTER",
                  payload: { key: "username", value: e },
                })
              }
            />
          </div>
        ),
        onFilterApply: applyFilters,
        onFilterReset: () => {
          dispatch({
            type: "SET_FILTER",
            payload: { key: "username", value: "" },
          });
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
              value={state.filters.email}
              onChange={(e) =>
                dispatch({
                  type: "SET_FILTER",
                  payload: { key: "email", value: e },
                })
              }
            />
          </div>
        ),
        onFilterApply: applyFilters,
        onFilterReset: () => {
          dispatch({
            type: "SET_FILTER",
            payload: { key: "email", value: "" },
          });
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
              value={state.filters.phone}
              onChange={(e) =>
                dispatch({
                  type: "SET_FILTER",
                  payload: { key: "phone", value: e },
                })
              }
            />
          </div>
        ),
        onFilterApply: applyFilters,
        onFilterReset: () => {
          dispatch({
            type: "SET_FILTER",
            payload: { key: "phone", value: "" },
          });
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
              value={state.filters.date}
              onChange={(e) =>
                dispatch({
                  type: "SET_FILTER",
                  payload: { key: "date", value: e },
                })
              }
            />
          </div>
        ),
        onFilterApply: applyFilters,
        onFilterReset: () => {
          dispatch({ type: "SET_FILTER", payload: { key: "date", value: "" } });
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
              value={state.filters.status}
              onChange={(e) =>
                dispatch({
                  type: "SET_FILTER",
                  payload: { key: "status", value: e.target.value },
                })
              }
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
          dispatch({
            type: "SET_FILTER",
            payload: { key: "status", value: "" },
          });
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
    ],
    [state.filters, applyFilters, getUserActions]
  );

  // ✅ Initialize filteredData when users load
  useEffect(() => {
    if (users) {
      dispatch({ type: "SET_FILTERED_DATA", payload: users });
    }
  }, [users]);

  // ✅ Handle pagination
  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    const timer = setTimeout(() => {
      const start = state.pageIndex * state.pageSize;
      const end = start + state.pageSize;
      dispatch({
        type: "SET_DATA",
        payload: state.filteredData.slice(start, end),
      });
      dispatch({ type: "SET_LOADING", payload: false });
    }, 200);

    return () => clearTimeout(timer);
  }, [state.pageIndex, state.pageSize, state.filteredData]);

  return (
    <Table
      name="users"
      columns={columns}
      data={state.data}
      loading={state.loading}
      total={state.total}
      pageIndex={state.pageIndex}
      pageSize={state.pageSize}
      setPageIndex={(index) =>
        dispatch({ type: "SET_PAGE_INDEX", payload: index })
      }
      setPageSize={(size) => dispatch({ type: "SET_PAGE_SIZE", payload: size })}
      groupFilter={
        <GroupFilter
          fields={filterFields}
          onApply={applyFilters}
          onReset={handleResetFilters}
        />
      }
      showIndividualFilters={true}
    />
  );
}

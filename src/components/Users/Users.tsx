"use client";
import { useGetUsers } from "@/services/users/users.hooks";
import styles from "./Users.module.scss";
import UsersStatsCard from "./UsersStatsCard/UsersSstatsCard";
import UsersTable from "./UsersTable/UsersTable";
import Spinner from "../ui/Spinner/Spinner";
const Users = () => {
  const { users, isLoading } = useGetUsers();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <UsersStatsCard users={users} />
      <UsersTable users={users} />
    </div>
  );
};

export default Users;

"use client";
import styles from "./Users.module.scss";
import UsersStatsCard from "./UsersStatsCard/UsersSstatsCard";
import UsersTable from "./UsersTable/UsersTable";
const Users = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <UsersStatsCard />
      <UsersTable />
    </div>
  );
};

export default Users;

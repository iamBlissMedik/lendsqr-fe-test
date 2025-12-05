"use client";
import styles from "./Users.module.scss";
import UsersStatsCard from "./UsersStatsCard/UsersSstatsCard";
const Users = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>
      <UsersStatsCard />
      <div>users table</div>
    </div>
  );
};

export default Users;

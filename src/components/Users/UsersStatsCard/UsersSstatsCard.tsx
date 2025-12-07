"use client";

import StatsCard from "@/components/ui/StatsCard/StatsCard";
import styles from "./UsersStatsCard.module.scss";
import { useGetUsers } from "@/services/users/users.hooks";
import Spinner from "@/components/ui/Spinner/Spinner";
import { IUser } from "@/types/users.types";
export interface UsersStatsCardProps {
  users: IUser[];
}
const UsersStatsCard = ({ users }: UsersStatsCardProps) => {
  const totalUsers = users?.length || 0;
  const activeUsers = users?.filter((u) => u.status === "Active").length || 0;
  const usersWithLoans =
    users?.filter((u) => u.educationEmployment?.loanRepayment).length || 0;
  const usersWithSavings =
    users?.filter(
      (u) =>
        u.accountBalance &&
        parseFloat(u.accountBalance.replace(/[^0-9.-]+/g, "")) > 0
    ).length || 0;

  const stats = [
    { img: "/images/u.users.svg", title: "Users", value: totalUsers },
    { img: "/images/u.active.svg", title: "Active Users", value: activeUsers },
    {
      img: "/images/u.loans.svg",
      title: "Users with Loans",
      value: usersWithLoans,
    },
    {
      img: "/images/u.savings.svg",
      title: "Users with Savings",
      value: usersWithSavings,
    },
  ];

  return (
    <div className={styles.grid}>
      {stats.map((stat, i) => (
        <StatsCard
          key={i}
          img={stat.img}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default UsersStatsCard;

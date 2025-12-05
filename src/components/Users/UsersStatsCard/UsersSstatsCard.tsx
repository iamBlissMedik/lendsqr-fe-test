"use client";

import StatsCard from "@/components/ui/StatsCard/StatsCard";
import styles from "./UsersStatsCard.module.scss";

const stats = [
  { img: "/images/u.users.svg", title: "Users", value: 1200 },
  { img: "/images/u.active.svg", title: "Active Users", value: 2000 },
  { img: "/images/u.loans.svg", title: "Users with Loans", value: 320 },
  { img: "/images/u.savings.svg", title: "Users with Savings", value: 54 },
];

const UsersStatsCard = () => {
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

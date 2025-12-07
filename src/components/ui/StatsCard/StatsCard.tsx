"use client"
import Image from "next/image";
import styles from "./StatsCard.module.scss";

interface StatsCardProps {
  img: string;
  title: string;
  value: string | number;
}

export default function StatsCard({ img, title, value }: StatsCardProps) {
  return (
    <div className={styles.box}>
      <Image src={img} alt={title} width={40} height={40} />
      <h4>{title}</h4>
      <p>{value || "N/A"}</p>
    </div>
  );
}

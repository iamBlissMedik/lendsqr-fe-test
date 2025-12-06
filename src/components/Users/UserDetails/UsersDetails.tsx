"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "./UserDetails.module.scss";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useGetUserById } from "@/services/users/users.hooks";
import UserGeneralDetails from "./UserGeneralDetails/UserGeneralDetails";

export default function UserDetails() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const { data: user, isLoading, isError } = useGetUserById(userId);
  const [activeTab, setActiveTab] = useState("General Details");

  if (isLoading) return <Spinner size={40} />;
  if (isError || !user) return <p>User not found</p>;

  return (
    <div>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => router.back()}>
        <Image src="/images/left.svg" alt="arrow left" width={30} height={30} />
        Back to Users
      </button>

      {/* Page Header */}
      <div className={styles.header}>
        <h1>User Details</h1>
        <div className={styles.actions}>
          <Button variant="outlined" borderColor="#E4033B" textColor="#E4033B">
            Blacklist User
          </Button>
          <Button variant="outlined" borderColor="#39CDCC" textColor="#39CDCC">
            Activate User
          </Button>
        </div>
      </div>

      {/* User Summary Card */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryTop}>
          <div className={styles.summaryTopDetails}>
            <div className={styles.userBasic}>
              <div className={styles.avatar}>
                <Image
                  src={user.profileImage || "/images/avatar.svg"}
                  alt={user.username}
                  width={40}
                  height={40}
                />
              </div>
              <div className={styles.userInfo}>
                <h2>{user.username}</h2>
                <p className={styles.accountNumber}>{user.accountNumber}</p>
              </div>
            </div>

            <div className={styles.userTier}>
              <p>User's Tier</p>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) =>
                  star <= user.tier ? (
                    <FaStar key={star} className={styles.filled} />
                  ) : (
                    <FaRegStar key={star} />
                  )
                )}
              </div>
            </div>
          </div>

          <div className={styles.userBalance}>
            <h3>{user.accountBalance}</h3>
            <p>
              {user.accountNumber}/{user.bankName}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {[
            "General Details",
            "documents",
            "Bank Details",
            "loans",
            "savings",
            "App and System",
          ].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? styles.active : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Details Content */}
      <div className={styles.detailsCard}>
        {activeTab === "General Details" && <UserGeneralDetails user={user} />}

        {activeTab !== "General Details" && (
          <div className={styles.emptyState}>
            <p>Content for {activeTab} tab coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

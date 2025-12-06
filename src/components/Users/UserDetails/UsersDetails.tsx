"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "./UserDetails.module.scss";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useGetUserById } from "@/services/users/users.hooks";

export default function UserDetails() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const { data: user, isLoading, isError } = useGetUserById(userId);
  const [activeTab, setActiveTab] = useState("general");

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
          {["general", "documents", "bank", "loans", "savings", "app"].map(
            (tab) => (
              <button
                key={tab}
                className={activeTab === tab ? styles.active : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace("_", " ")}
              </button>
            )
          )}
        </div>
      </div>

      {/* Details Content */}
      <div className={styles.detailsCard}>
        {activeTab === "general" && (
          <>
            {/* Personal Information */}
            <section className={styles.section}>
              <h3>Personal Information</h3>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>Full Name</label>
                  <p>{user.personalInfo.fullName}</p>
                </div>
                <div className={styles.field}>
                  <label>Phone Number</label>
                  <p>{user.personalInfo.phoneNumber}</p>
                </div>
                <div className={styles.field}>
                  <label>Email Address</label>
                  <p>{user.personalInfo.emailAddress}</p>
                </div>
                <div className={styles.field}>
                  <label>BVN</label>
                  <p>{user.personalInfo.bvn}</p>
                </div>
                <div className={styles.field}>
                  <label>Gender</label>
                  <p>{user.personalInfo.gender}</p>
                </div>
                <div className={styles.field}>
                  <label>Marital Status</label>
                  <p>{user.personalInfo.maritalStatus}</p>
                </div>
                <div className={styles.field}>
                  <label>Children</label>
                  <p>{user.personalInfo.children}</p>
                </div>
                <div className={styles.field}>
                  <label>Type of Residence</label>
                  <p>{user.personalInfo.typeOfResidence}</p>
                </div>
              </div>
            </section>

            {/* Education and Employment */}
            <section className={styles.section}>
              <h3>Education and Employment</h3>
              <div className={styles["grid-education"]}>
                <div className={styles.field}>
                  <label>Level of Education</label>
                  <p>{user.educationEmployment.levelOfEducation}</p>
                </div>
                <div className={styles.field}>
                  <label>Employment Status</label>
                  <p>{user.educationEmployment.employmentStatus}</p>
                </div>
                <div className={styles.field}>
                  <label>Sector of Employment</label>
                  <p>{user.educationEmployment.sectorOfEmployment}</p>
                </div>
                <div className={styles.field}>
                  <label>Duration of Employment</label>
                  <p>{user.educationEmployment.durationOfEmployment}</p>
                </div>
                <div className={styles.field}>
                  <label>Office Email</label>
                  <p>{user.educationEmployment.officeEmail}</p>
                </div>
                <div className={styles.field}>
                  <label>Monthly Income</label>
                  <p>{user.educationEmployment.monthlyIncome}</p>
                </div>
                <div className={styles.field}>
                  <label>Loan Repayment</label>
                  <p>{user.educationEmployment.loanRepayment}</p>
                </div>
              </div>
            </section>

            {/* Socials */}
            <section className={styles.section}>
              <h3>Socials</h3>
              <div
                className={styles.grid}
              >
                <div className={styles.field}>
                  <label>Twitter</label>
                  <p>{user.socials.twitter}</p>
                </div>
                <div className={styles.field}>
                  <label>Facebook</label>
                  <p>{user.socials.facebook}</p>
                </div>
                <div
                  className={styles.field}
                >
                  <label>Instagram</label>
                  <p>{user.socials.instagram}</p>
                </div>
              </div>
            </section>

            {/* Guarantor */}
            <section className={styles.section}>
              <h3>Guarantor</h3>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>Full Name</label>
                  <p>{user.guarantor.fullName}</p>
                </div>
                <div className={styles.field}>
                  <label>Phone Number</label>
                  <p>{user.guarantor.phoneNumber}</p>
                </div>
                <div className={styles.field}>
                  <label>Email Address</label>
                  <p>{user.guarantor.emailAddress}</p>
                </div>
                <div className={styles.field}>
                  <label>Relationship</label>
                  <p>{user.guarantor.relationship}</p>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab !== "general" && (
          <div className={styles.emptyState}>
            <p>Content for {activeTab} tab coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}

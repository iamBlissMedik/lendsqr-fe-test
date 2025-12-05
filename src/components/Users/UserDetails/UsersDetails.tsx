"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaStar, FaRegStar } from "react-icons/fa";
import styles from "./UserDetails.module.scss";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";

// Static mock data for testing UI
const mockUser = {
  id: "user_123",
  username: "Adedeji Adebayo",
  accountNumber: "9876543210",
  accountBalance: "₦2,000,000.00",
  bankName: "GTBank",
  status: "Active",
  personalInfo: {
    fullName: "Adedeji Adebayo",
    phoneNumber: "08078903721",
    emailAddress: "adedeji@lendsqr.com",
    bvn: "07060780922",
    gender: "Male",
    maritalStatus: "Single",
    children: "None",
    typeOfResidence: "Parent's Apartment",
  },
  educationEmployment: {
    levelOfEducation: "B.Sc",
    employmentStatus: "Employed",
    sectorOfEmployment: "FinTech",
    durationOfEmployment: "2 years",
    officeEmail: "adedeji@lendsqr.com",
    monthlyIncome: "₦200,000 - ₦400,000",
    loanRepayment: "₦40,000",
  },
  socials: {
    twitter: "@adedeji_adebayo",
    facebook: "Adedeji Adebayo",
    instagram: "@adedeji_adebayo",
  },
  guarantor: {
    fullName: "Debby Ogana",
    phoneNumber: "08160780928",
    emailAddress: "debby@gmail.com",
    relationship: "Sister",
  },
};

export default function UserDetails() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const [userTier, setUserTier] = useState(3);

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
                <img src="/images/avatar.svg" alt={mockUser.username} />
              </div>
              <div className={styles.userInfo}>
                <h2>{mockUser.username}</h2>
                <p className={styles.accountNumber}>{mockUser.accountNumber}</p>
              </div>
            </div>

            <div className={styles.userTier}>
              <p>User's Tier</p>
              <div className={styles.stars}>
                {[1, 2, 3].map((star) =>
                  star <= userTier ? (
                    <FaStar key={star} className={styles.filled} />
                  ) : (
                    <FaRegStar key={star} />
                  )
                )}
              </div>
            </div>
          </div>

          <div className={styles.userBalance}>
            <h3>{mockUser.accountBalance}</h3>
            <p>
              {mockUser.accountNumber}/{mockUser.bankName}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={activeTab === "general" ? styles.active : ""}
            onClick={() => setActiveTab("general")}
          >
            General Details
          </button>
          <button
            className={activeTab === "documents" ? styles.active : ""}
            onClick={() => setActiveTab("documents")}
          >
            Documents
          </button>
          <button
            className={activeTab === "bank" ? styles.active : ""}
            onClick={() => setActiveTab("bank")}
          >
            Bank Details
          </button>
          <button
            className={activeTab === "loans" ? styles.active : ""}
            onClick={() => setActiveTab("loans")}
          >
            Loans
          </button>
          <button
            className={activeTab === "savings" ? styles.active : ""}
            onClick={() => setActiveTab("savings")}
          >
            Savings
          </button>
          <button
            className={activeTab === "app" ? styles.active : ""}
            onClick={() => setActiveTab("app")}
          >
            App and System
          </button>
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
                  <p>{mockUser.personalInfo.fullName}</p>
                </div>
                <div className={styles.field}>
                  <label>Phone Number</label>
                  <p>{mockUser.personalInfo.phoneNumber}</p>
                </div>
                <div className={styles.field}>
                  <label>Email Address</label>
                  <p>{mockUser.personalInfo.emailAddress}</p>
                </div>
                <div className={styles.field}>
                  <label>BVN</label>
                  <p>{mockUser.personalInfo.bvn}</p>
                </div>
                <div className={styles.field}>
                  <label>Gender</label>
                  <p>{mockUser.personalInfo.gender}</p>
                </div>
                <div className={styles.field}>
                  <label>Marital Status</label>
                  <p>{mockUser.personalInfo.maritalStatus}</p>
                </div>
                <div className={styles.field}>
                  <label>Children</label>
                  <p>{mockUser.personalInfo.children}</p>
                </div>
                <div className={styles.field}>
                  <label>Type of Residence</label>
                  <p>{mockUser.personalInfo.typeOfResidence}</p>
                </div>
              </div>
            </section>

            {/* Education and Employment */}
            <section className={styles.section}>
              <h3>Education and Employment</h3>
              <div className={styles["grid-education"]}>
                <div className={styles.field}>
                  <label>Level of Education</label>
                  <p>{mockUser.educationEmployment.levelOfEducation}</p>
                </div>
                <div className={styles.field}>
                  <label>Employment Status</label>
                  <p>{mockUser.educationEmployment.employmentStatus}</p>
                </div>
                <div className={styles.field}>
                  <label>Sector of Employment</label>
                  <p>{mockUser.educationEmployment.sectorOfEmployment}</p>
                </div>
                <div className={styles.field}>
                  <label>Duration of Employment</label>
                  <p>{mockUser.educationEmployment.durationOfEmployment}</p>
                </div>
                <div className={styles.field}>
                  <label>Office Email</label>
                  <p>{mockUser.educationEmployment.officeEmail}</p>
                </div>
                <div className={styles.field}>
                  <label>Monthly Income</label>
                  <p>{mockUser.educationEmployment.monthlyIncome}</p>
                </div>
                <div className={styles.field}>
                  <label>Loan Repayment</label>
                  <p>{mockUser.educationEmployment.loanRepayment}</p>
                </div>
              </div>
            </section>

            {/* Socials */}
            <section className={styles.section}>
              <h3>Socials</h3>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>Twitter</label>
                  <p>{mockUser.socials.twitter}</p>
                </div>
                <div className={styles.field}>
                  <label>Facebook</label>
                  <p>{mockUser.socials.facebook}</p>
                </div>
                <div className={styles.field}>
                  <label>Instagram</label>
                  <p>{mockUser.socials.instagram}</p>
                </div>
              </div>
            </section>

            {/* Guarantor */}
            <section className={styles.section}>
              <h3>Guarantor</h3>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label>Full Name</label>
                  <p>{mockUser.guarantor.fullName}</p>
                </div>
                <div className={styles.field}>
                  <label>Phone Number</label>
                  <p>{mockUser.guarantor.phoneNumber}</p>
                </div>
                <div className={styles.field}>
                  <label>Email Address</label>
                  <p>{mockUser.guarantor.emailAddress}</p>
                </div>
                <div className={styles.field}>
                  <label>Relationship</label>
                  <p>{mockUser.guarantor.relationship}</p>
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

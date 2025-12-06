"use client";

import React from "react";
import { IUser } from "@/types/users.types";
import styles from "./UserGeneralDetails.module.scss";

interface Props {
  user: IUser;
}

const UserGeneralDetails: React.FC<Props> = ({ user }) => {
  return (
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
        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Twitter</label>
            <p>{user.socials.twitter}</p>
          </div>
          <div className={styles.field}>
            <label>Facebook</label>
            <p>{user.socials.facebook}</p>
          </div>
          <div className={styles.field}>
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
  );
};

export default UserGeneralDetails;

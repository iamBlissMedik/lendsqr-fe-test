import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import UserGeneralDetails from "./UserGeneralDetails";
import { IUser } from "@/types/users.types";

// Mock user data
const mockUser: IUser = {
  id: "1",
  organization: "Lendsqr",
  username: "JohnDoe",
  email: "john@example.com",
  phone: "1234567890",
  createdAt: "2023-12-01",
  status: "Active",
  tier: 2,
  accountNumber: "1234567890",
  accountBalance: "5000",
  bankName: "Lendsqr Bank",
  personalInfo: {
    fullName: "John Doe",
    phoneNumber: "1234567890",
    emailAddress: "john@example.com",
    bvn: "12345678901",
    gender: "Male",
    maritalStatus: "Single",
    children: "0",
    typeOfResidence: "Apartment",
  },
  educationEmployment: {
    levelOfEducation: "Bachelors",
    employmentStatus: "Employed",
    sectorOfEmployment: "Tech",
    durationOfEmployment: "2 years",
    officeEmail: "john@lendsqr.com",
    monthlyIncome: "5000",
    loanRepayment: "200",
  },
  socials: {
    twitter: "@johndoe",
    facebook: "facebook.com/johndoe",
    instagram: "@johndoe",
  },
  guarantor: {
    fullName: "Jane Doe",
    phoneNumber: "0987654321",
    emailAddress: "jane@example.com",
    relationship: "Sister",
  },
  profileImage: "profile.jpg",
};

describe("UserGeneralDetails Component", () => {
  // Positive Scenario 1: Personal Information
  test("renders personal information correctly", () => {
    render(<UserGeneralDetails user={mockUser} />);

    expect(screen.getByLabelText("Full Name")).toHaveTextContent("John Doe");
    expect(screen.getByLabelText("Phone Number")).toHaveTextContent(
      "1234567890"
    );
    expect(screen.getByLabelText("Email Address")).toHaveTextContent(
      "john@example.com"
    );
  });

  // Positive Scenario 2: Education and Employment
  test("renders education and employment correctly", () => {
    render(<UserGeneralDetails user={mockUser} />);

    expect(screen.getByLabelText("Level of Education")).toHaveTextContent(
      "Bachelors"
    );
    expect(screen.getByLabelText("Employment Status")).toHaveTextContent(
      "Employed"
    );
    expect(screen.getByLabelText("Monthly Income")).toHaveTextContent("5000");
  });

  // Negative Scenario 1: Missing personal information
  test("handles missing personal information gracefully", () => {
    const userWithoutPersonalInfo = { ...mockUser, personalInfo: {} } as any;
    render(<UserGeneralDetails user={userWithoutPersonalInfo} />);

    expect(screen.getByLabelText("Full Name")).toHaveTextContent("");
    expect(screen.getByLabelText("Phone Number")).toHaveTextContent("");
  });

  // Negative Scenario 2: Missing education and employment
  test("handles missing education and employment gracefully", () => {
    const userWithoutEducation = {
      ...mockUser,
      educationEmployment: {},
    } as any;
    render(<UserGeneralDetails user={userWithoutEducation} />);

    expect(screen.getByLabelText("Level of Education")).toHaveTextContent("");
    expect(screen.getByLabelText("Employment Status")).toHaveTextContent("");
  });
});

import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UsersTable, { UsersTableProps } from "./UsersTable";

// Mock next/router
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

// Mock saveUser (IndexedDB)
jest.mock("../../../lib/indexedDB.ts", () => ({
  saveUser: jest.fn(),
}));

const mockUsers: UsersTableProps["users"] = [
  {
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
  },
  {
    id: "2",
    organization: "Irorun",
    username: "JaneSmith",
    email: "jane@example.com",
    phone: "0987654321",
    createdAt: "2023-12-02",
    status: "Inactive",
    tier: 1,
    accountNumber: "0987654321",
    accountBalance: "3000",
    bankName: "Irorun Bank",
    personalInfo: {
      fullName: "Jane Smith",
      phoneNumber: "0987654321",
      emailAddress: "jane@example.com",
      bvn: "10987654321",
      gender: "Female",
      maritalStatus: "Married",
      children: "1",
      typeOfResidence: "House",
    },
    educationEmployment: {
      levelOfEducation: "Masters",
      employmentStatus: "Self-employed",
      sectorOfEmployment: "Finance",
      durationOfEmployment: "5 years",
      officeEmail: "jane@irorun.com",
      monthlyIncome: "7000",
      loanRepayment: "300",
    },
    socials: {
      twitter: "@janesmith",
      facebook: "facebook.com/janesmith",
      instagram: "@janesmith",
    },
    guarantor: {
      fullName: "John Smith",
      phoneNumber: "1234509876",
      emailAddress: "johnsmith@example.com",
      relationship: "Brother",
    },
    profileImage: "profile2.jpg",
  },
];

describe("UsersTable Component", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  test("renders users table with rows", async () => {
    render(
      React.createElement<UsersTableProps>(UsersTable, { users: mockUsers })
    );

    expect(await screen.findByText("JohnDoe")).toBeInTheDocument();
    expect(await screen.findByText("JaneSmith")).toBeInTheDocument();
  });
});
test("displays 'No data found' when users array is empty", async () => {
  render(React.createElement<UsersTableProps>(UsersTable, { users: [] }));

  expect(await screen.findByText(/No data/i)).toBeInTheDocument();
});

import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import UserDetails from "./UsersDetails";

// Mock next/navigation
const backMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: backMock }),
  useParams: () => ({ id: "1" }),
}));

// Mock hook
const mockUser = {
  id: "1",
  username: "JohnDoe",
  profileImage: "/profile.jpg",
  accountNumber: "123",
  accountBalance: "5000",
  bankName: "Bank",
  tier: 3,
};
jest.mock("../../../services/users/users.hooks.ts", () => ({
  useGetUserById: () => ({ data: mockUser, isLoading: false, isError: false }),
}));

// Mock child component
jest.mock("./UserGeneralDetails/UserGeneralDetails", () => ({
  __esModule: true,
  default: ({ user }: any) => <div>General Details for {user.username}</div>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));
// Mock the hook at top-level
const mockUseGetUserById = jest.fn();
jest.mock("../../../services/users/users.hooks.ts", () => ({
  useGetUserById: () => mockUseGetUserById(),
}));
describe("UserDetails Component ", () => {
     afterEach(() => {
       jest.clearAllMocks();
     });
   test("renders user details correctly", () => {
     // Mock returns a valid user
     mockUseGetUserById.mockReturnValue({
       data: mockUser,
       isLoading: false,
       isError: false,
     });

     render(<UserDetails />);

     expect(screen.getByText("JohnDoe")).toBeInTheDocument();
     expect(
       screen.getByText("General Details for JohnDoe")
     ).toBeInTheDocument();
     expect(screen.getByText(mockUser.accountBalance)).toBeInTheDocument();
   });


 test("shows 'User not found' when isError is true", () => {
   // Setup mock return value
   mockUseGetUserById.mockReturnValue({
     data: null,
     isLoading: false,
     isError: true,
   });

   render(<UserDetails />);

   expect(screen.getByText("User not found")).toBeInTheDocument();
 });
});

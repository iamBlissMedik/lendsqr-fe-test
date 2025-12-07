import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { usePathname, useRouter } from "next/navigation";

// Mock next/navigation
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: () => ({ push: pushMock }),
}));

describe("Sidebar Users Link", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  // ---------------- Positive scenarios ----------------
  test("renders Users link", () => {
    (usePathname as jest.Mock).mockReturnValue("/users");
    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );
    const usersLink = screen.getByText("Users");
    expect(usersLink).toBeInTheDocument();
  });

  test("Users link has active class when on /users route", () => {
    (usePathname as jest.Mock).mockReturnValue("/users");
    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );
    const usersLink = screen.getByText("Users").closest("a");
    expect(usersLink).toHaveClass("active-1");
  });

  // ---------------- Negative scenarios ----------------
  test("Users link does NOT have active class when on different route", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard"); // Not /users
    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );
    const usersLink = screen.getByText("Users").closest("a");
    expect(usersLink).not.toHaveClass("active-1");
  });


});

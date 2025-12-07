import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { useRouter, useSearchParams } from "next/navigation";

// ---------------- MOCKS ----------------
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("next/image", () => (props: any) => <img {...props} />);

// InputField mock
jest.mock("../../InputField/InputField", () => ({
  InputField: ({ value, onChange, placeholder, error }: any) => (
    <div>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="email-input"
      />
      {error && <span>{error}</span>}
    </div>
  ),
}));

// PasswordField mock
jest.mock("../../InputField/PasswordField", () => ({
  PasswordField: ({ value, onChange, placeholder, error }: any) => (
    <div>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="password-input"
      />
      {error && <span>{error}</span>}
    </div>
  ),
}));

// Button mock (type="submit" fixes form submission)
jest.mock("../../ui/Button/Button", () => (props: any) => (
  <button
    disabled={props.disabled}
    type="submit" // <<< important
    data-testid="login-btn"
  >
    {props.children}
  </button>
));

// ----------------------------------------------------

describe("Login Component", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "/users",
    });

    // FULL JSDOM COOKIE FIX (getter + setter)
    let cookieStore = "";
    Object.defineProperty(document, "cookie", {
      configurable: true,
      get: () => cookieStore,
      set: (val) => {
        cookieStore = val;
      },
    });
  });

  // =======================
  // POSITIVE TESTS
  // =======================

  test("renders email and password fields", () => {
    render(<Login />);
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
  });

  test("enables button when form becomes valid", async () => {
    render(<Login />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "Password123" },
    });

    const btn = screen.getByTestId("login-btn");
    await waitFor(() => expect(btn).not.toBeDisabled());
  });

  test("successful submission sets cookie and redirects", async () => {
    render(<Login />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "Password123" },
    });

    const btn = screen.getByTestId("login-btn");
    await waitFor(() => expect(btn).not.toBeDisabled());

    fireEvent.click(btn);

    await waitFor(() => {
      expect(document.cookie.includes("auth=true")).toBe(true);
      expect(pushMock).toHaveBeenCalledWith("/users");
    });
  });

  // =======================
  // NEGATIVE TESTS
  // =======================

  test("button remains disabled with empty fields", () => {
    render(<Login />);
    expect(screen.getByTestId("login-btn")).toBeDisabled();
  });

  test("invalid email displays error message", async () => {
    render(<Login />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "wrongemail" },
    });

    fireEvent.blur(screen.getByTestId("email-input"));

    await waitFor(() =>
      expect(screen.getByText(/invalid/i)).toBeInTheDocument()
    );
  });

  test("does NOT submit when form invalid", async () => {
    render(<Login />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "bad" },
    });

    const btn = screen.getByTestId("login-btn");
    await waitFor(() => expect(btn).toBeDisabled());

    fireEvent.click(btn);

    await waitFor(() => expect(pushMock).not.toHaveBeenCalled());
  });
});

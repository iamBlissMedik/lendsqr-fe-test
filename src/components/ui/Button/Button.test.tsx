import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import styles from "./Button.module.scss";

describe("Button Component", () => {
  // =======================
  // POSITIVE TESTS
  // =======================

  test("renders button with children text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
  });

  test("calls onClick when clicked", () => {
    const handler = jest.fn();
    render(<Button onClick={handler}>Press</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test("shows loading spinner when loading=true", () => {
    render(<Button loading>Submit</Button>);
    const spinner = screen
      .getByRole("button")
      .querySelector(`.${styles.spinner}`);
    expect(spinner).toBeInTheDocument();
  });

  test("applies fullWidth class", () => {
    const { container } = render(<Button fullWidth>Wide</Button>);
    expect(container.firstChild).toHaveClass("fullWidth");
  });

  test("applies outlined variant", () => {
    const { container } = render(<Button variant="outlined">Outlined</Button>);
    expect(container.firstChild).toHaveClass("outlined");
  });

  // =======================
  // NEGATIVE TESTS
  // =======================

  test("does NOT call onClick when disabled", () => {
    const handler = jest.fn();
    render(
      <Button disabled onClick={handler}>
        Blocked
      </Button>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handler).not.toHaveBeenCalled();
  });

  test("does NOT call onClick when loading=true", () => {
    const handler = jest.fn();
    render(
      <Button loading onClick={handler}>
        Saving
      </Button>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handler).not.toHaveBeenCalled();
  });

  test("does NOT show spinner when loading=false", () => {
    render(<Button loading={false}>Submit</Button>);
    const spinner = screen
      .getByRole("button")
      .querySelector(`.${styles.spinner}`);
    expect(spinner).toBeNull();
  });
});

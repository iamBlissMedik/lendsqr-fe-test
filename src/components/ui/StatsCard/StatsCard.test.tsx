import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import StatsCard from "./StatsCard";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => {
    // render as simple img for testing
    return <img src={src} alt={alt} />;
  },
}));

describe("StatsCard Component", () => {
  test("renders image, title, and numeric value", () => {
    render(<StatsCard img="/icon.png" title="Users" value={123} />);

    const image = screen.getByAltText("Users");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/icon.png");
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  test("renders string value correctly", () => {
    render(<StatsCard img="/icon2.png" title="Revenue" value="$500" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$500")).toBeInTheDocument();
    expect(screen.getByAltText("Revenue")).toHaveAttribute("src", "/icon2.png");
  });

  // Negative scenarios
  test("does not render incorrect title or value", () => {
    render(<StatsCard img="/icon3.png" title="Profit" value="1000" />);

    // Incorrect title
    expect(screen.queryByText("Revenue")).not.toBeInTheDocument();

    // Incorrect value
    expect(screen.queryByText("$500")).not.toBeInTheDocument();
  });

  test("image has correct alt text and src", () => {
    render(<StatsCard img="/icon4.png" title="Expenses" value={200} />);

    const image = screen.getByAltText("Expenses");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/icon4.png");

    // Negative: wrong src
    expect(image).not.toHaveAttribute("src", "/wrong.png");
  });

  test("renders fallback even if value is empty", () => {
    render(<StatsCard img="/icon5.png" title="EmptyValue" value="" />);

    expect(screen.getByText("EmptyValue")).toBeInTheDocument();
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
});

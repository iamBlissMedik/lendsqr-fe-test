import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const setPageIndex = jest.fn();
  const setPageSize = jest.fn();

  beforeEach(() => {
    setPageIndex.mockClear();
    setPageSize.mockClear();
  });

  test("renders current page button and navigation buttons", () => {
    render(
      React.createElement(Pagination, {
        pageIndex: 0,
        pageSize: 10,
        total: 50,
        setPageIndex: setPageIndex,
        setPageSize: setPageSize,
      })
    );

    // Previous button disabled on first page
    expect(screen.getByLabelText("Previous page")).toBeDisabled();

    // Next button enabled
    expect(screen.getByLabelText("Next page")).toBeEnabled();

    // Page buttons rendered
    expect(screen.getByRole("button", { name: "Page 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2" })).toBeInTheDocument();
  });

  test("clicking Next and page buttons calls callbacks", () => {
    render(
      React.createElement(Pagination, {
        pageIndex: 0,
        pageSize: 10,
        total: 50,
        setPageIndex: setPageIndex,
        setPageSize: setPageSize,
      })
    );

    fireEvent.click(screen.getByLabelText("Next page"));
    expect(setPageIndex).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(setPageIndex).toHaveBeenCalledWith(1);
  });

  test("dropdown toggles and selecting a page size calls callback", () => {
    render(
      React.createElement(Pagination, {
        pageIndex: 0,
        pageSize: 10,
        total: 50,
        setPageIndex: setPageIndex,
        setPageSize: setPageSize,
      })
    );

    // Click the dropdown button to open
    const dropdownBtn = screen.getByLabelText("Items per page");
    fireEvent.click(dropdownBtn);

    // Dropdown options (li elements with role="option") are now visible
    const option25 = screen.getByRole("option", { name: "25" });
    expect(option25).toBeInTheDocument();

    // Click the option (li element)
    fireEvent.click(option25);

    // Verify callback was called with correct size
    expect(setPageSize).toHaveBeenCalledWith(25);
  });
});

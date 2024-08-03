import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Header from "./header";

describe("Header Component", () => {
  it("renders the navigation link", () => {
    render(<Header />);
    const link = screen.getByRole("link", { name: /hacker news app/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders the header with correct class names", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("sticky top-0 z-50");
  });

  it("renders the navigation bar with correct class names", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass(
      "bg-white p-4 border-b-2 border-customBorder shadow-md"
    );
  });
});

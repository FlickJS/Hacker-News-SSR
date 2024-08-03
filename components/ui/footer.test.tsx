import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Footer from "./footer";

describe("Footer Component", () => {
  it("renders the copyright text", () => {
    render(<Footer />);
    const copyrightText = screen.getByText(
      /© 2024 Hacker News App. All rights reserved./i
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("renders the Home link", () => {
    render(<Footer />);
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders the feedback link with icon", () => {
    render(<Footer />);
    const feedbackLink = screen.getByRole("link", {
      name: /leave us feedback/i,
    });
    expect(feedbackLink).toBeInTheDocument();
    expect(feedbackLink).toHaveAttribute("href", "/feedback");
    expect(feedbackLink.querySelector("svg")).toBeInTheDocument();
  });
});

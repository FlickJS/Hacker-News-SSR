import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Hero from "./hero";

describe("Hero Component", () => {
  it("renders the heading", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", {
      name: /welcome to hacker news stories/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<Hero />);
    const description = screen.getByText(
      /discover the latest and greatest top stories from hacker news/i
    );
    expect(description).toBeInTheDocument();
  });

  it("renders the feedback link with correct text", () => {
    render(<Hero />);
    const feedbackLink = screen.getByRole("link", {
      name: /📝 please leave us your feedback/i,
    });
    expect(feedbackLink).toBeInTheDocument();
    expect(feedbackLink).toHaveAttribute("href", "/feedback");
  });
});

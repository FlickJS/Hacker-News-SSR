import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import CommentsLoading from "./comments-loading";

describe("CommentsLoading Component", () => {
  it("renders the heading", () => {
    render(<CommentsLoading />);
    const heading = screen.getByRole("heading", { name: /comments/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders five loading placeholders", () => {
    render(<CommentsLoading />);
    const placeholders = screen.getAllByRole("listitem");
    expect(placeholders).toHaveLength(5);
  });

  it("passes custom props to ContentLoader", () => {
    render(<CommentsLoading height={200} viewBox="0 0 400 200" />);
    const contentLoaders = screen
      .getAllByRole("listitem")
      .map((item) => item.querySelector("svg"));
    contentLoaders.forEach((contentLoader) => {
      expect(contentLoader).toHaveAttribute("height", "200");
      expect(contentLoader).toHaveAttribute("viewBox", "0 0 400 200");
    });
  });
});

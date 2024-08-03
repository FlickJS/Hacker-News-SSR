import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Story from "./story";
import { Story as StoryType } from "@/types/types";

const mockStory: StoryType = {
  by: "test_author",
  descendants: 42,
  id: 1,
  score: 100,
  time: 1609459200,
  title: "Test Story",
  type: "story",
  url: "http://test.com",
};

describe("Story Component", () => {
  it("renders the story title", () => {
    render(<Story story={mockStory} />);
    const title = screen.getByText("Test Story");
    expect(title).toBeInTheDocument();
  });

  it("renders the author", () => {
    render(<Story story={mockStory} />);
    const author = screen.getByText("test_author");
    expect(author).toBeInTheDocument();
  });

  it("renders the score", () => {
    render(<Story story={mockStory} />);
    const score = screen.getByText("100");
    expect(score).toBeInTheDocument();
  });

  it("renders the comments count", () => {
    render(<Story story={mockStory} />);
    const comments = screen.getByText("42");
    expect(comments).toBeInTheDocument();
  });

  it("renders the posted date", () => {
    render(<Story story={mockStory} />);
    const dateElement = screen.getByText((content, element) => {
      const hasText = (node: Element) =>
        node.textContent === "1.01.2021, 01:00:00";
      const nodeHasText = hasText(element!);
      const childrenDontHaveText = Array.from(element?.children || []).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    });
    expect(dateElement).toBeInTheDocument();
  });

  it("renders the link to the story", () => {
    render(<Story story={mockStory} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/story/${mockStory.id}`);
  });
});

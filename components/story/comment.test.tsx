import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Comment from "./comment";
import { CommentType } from "@/types/types";

const mockComment: CommentType = {
  by: "test_user",
  id: 1,
  kids: [],
  text: "This is a test comment",
  time: 1609459200,
};

const mockCommentWithKids: CommentType = {
  by: "test_user",
  id: 1,
  kids: [
    {
      by: "child_user",
      id: 2,
      kids: [],
      text: "This is a child comment",
      time: 1609462800,
    },
  ],
  text: "This is a test comment with children",
  time: 1609459200,
};

describe("Comment Component", () => {
  it("renders the comment text", () => {
    render(<Comment comment={mockComment} />);
    const commentText = screen.getByText("This is a test comment");
    expect(commentText).toBeInTheDocument();
  });

  it("renders the author and time", () => {
    render(<Comment comment={mockComment} />);
    const authorAndTime = screen.getByText(
      /Commented by: test_user - 1.01.2021, 01:00:00/i
    );
    expect(authorAndTime).toBeInTheDocument();
  });

  it("renders child comments", () => {
    render(<Comment comment={mockCommentWithKids} />);
    const childCommentText = screen.getByText("This is a child comment");
    expect(childCommentText).toBeInTheDocument();
  });

  it("does not render the comment if text is missing", () => {
    const mockCommentWithoutText: CommentType = { ...mockComment, text: "" };
    const { container } = render(<Comment comment={mockCommentWithoutText} />);
    expect(container).toBeEmptyDOMElement();
  });
});

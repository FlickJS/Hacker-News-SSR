import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import BackToHomeLink from "./back-to-home";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("BackToHomeLink Component", () => {
  it("renders the button with correct text", () => {
    render(<BackToHomeLink />);
    const button = screen.getByRole("button", {
      name: /go back to the previous page/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("calls router.back when clicked", () => {
    const router = { back: vi.fn() };
    (useRouter as jest.Mock).mockReturnValue(router);

    render(<BackToHomeLink />);
    const button = screen.getByRole("button", {
      name: /go back to the previous page/i,
    });
    fireEvent.click(button);
    expect(router.back).toHaveBeenCalled();
  });
});

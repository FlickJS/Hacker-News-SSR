import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ScrollToTopButton from "./scroll-to-top-button";
import { describe, vi, it, expect } from "vitest";

Object.defineProperty(global.window, "scrollTo", { value: vi.fn() });

describe("ScrollToTopButton", () => {
  it("should not be visible when scrolled less than 300px", () => {
    render(<ScrollToTopButton />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(
      screen.queryByRole("button", { name: /scroll to top/i })
    ).not.toBeInTheDocument();
  });

  it("should be visible when scrolled more than 300px", () => {
    render(<ScrollToTopButton />);
    fireEvent.scroll(window, { target: { scrollY: 301 } });
    expect(
      screen.getByRole("button", { name: /scroll to top/i })
    ).toBeInTheDocument();
  });

  it("should scroll to top when button is clicked", () => {
    render(<ScrollToTopButton />);
    fireEvent.scroll(window, { target: { scrollY: 301 } });
    fireEvent.click(screen.getByRole("button", { name: /scroll to top/i }));
    expect(global.window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});

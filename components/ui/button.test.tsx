import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Button from "./button";

describe("Button Component", () => {
  it("renders the button with children", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("applies the default and additional class names", () => {
    render(<Button className="custom-class">Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass(
      "px-6 py-3 bg-white text-primary font-semibold shadow-md hover:bg-gray-100 transition duration-300 rounded-md custom-class"
    );
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders a disabled button", () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDisabled();
  });

  it("sets the button type correctly", () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });
});

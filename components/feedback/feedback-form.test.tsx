import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import FeedbackForm from "./feedback-form";
import { FeedbackFormProps } from "@/types/types";

const mockForm = {
  name: "",
  email: "",
  feedback: "",
};

const mockErrors = {
  name: "",
  email: "",
  feedback: "",
  form: "",
};

const handleChange = vi.fn();
const handleSubmit = vi.fn();

const renderComponent = (props: Partial<FeedbackFormProps> = {}) => {
  const defaultProps: FeedbackFormProps = {
    form: mockForm,
    errors: mockErrors,
    successMessage: "",
    handleChange,
    handleSubmit,
    ...props,
  };
  return render(<FeedbackForm {...defaultProps} />);
};

describe("FeedbackForm Component", () => {
  it("renders the form fields", () => {
    renderComponent();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/feedback/i)).toBeInTheDocument();
  });

  it("calls handleChange on input change", () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it("calls handleSubmit on form submit", () => {
    renderComponent();
    fireEvent.submit(screen.getByTestId("feedback-form"));
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("displays error messages", () => {
    const errors = {
      name: "Name is required",
      email: "Email is invalid",
      feedback: "Feedback is required",
      form: "",
    };
    renderComponent({ errors });
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
    expect(screen.getByText(/feedback is required/i)).toBeInTheDocument();
  });

  it("displays success message", () => {
    renderComponent({ successMessage: "Feedback submitted successfully!" });
    expect(
      screen.getByText(/feedback submitted successfully/i)
    ).toBeInTheDocument();
  });
});

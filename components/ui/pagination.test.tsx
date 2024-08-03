import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Pagination from "./pagination";

describe("Pagination Component", () => {
  it("renders pagination links correctly", () => {
    render(<Pagination currentPage={1} totalPages={5} />);

    expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Page 3")).toBeInTheDocument();
    expect(screen.queryByLabelText("Page 4")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Page 5")).toBeInTheDocument();

    expect(screen.getByLabelText("Next Page")).toBeInTheDocument();
    expect(screen.queryByLabelText("Previous Page")).not.toBeInTheDocument();
  });

  it("displays ellipsis correctly for long paginations", () => {
    render(<Pagination currentPage={5} totalPages={10} />);

    expect(screen.getAllByText("...")).toHaveLength(1);
  });

  it('renders "Previous" and "Next" buttons correctly on middle pages', () => {
    render(<Pagination currentPage={3} totalPages={5} />);

    expect(screen.getByLabelText("Previous Page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next Page")).toBeInTheDocument();
  });
});

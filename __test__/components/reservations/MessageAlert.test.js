import React from "react";
import { render, screen } from "@testing-library/react";
import MessageAlert from "@/components/reservations/MessageAlert";

describe("MessageAlert Component Tests", () => {
  it("renders null when message prop is not provided", () => {
    render(<MessageAlert />);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("renders error message with correct styles", () => {
    const errorMessage = "This is an error message";
    render(<MessageAlert message={errorMessage} type="error" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(errorMessage);
    expect(alert).toHaveClass("bg-red-200", "text-red-800");
  });

  it("renders success message with correct styles", () => {
    const successMessage = "This is a success message";
    render(<MessageAlert message={successMessage} type="success" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(successMessage);
    expect(alert).toHaveClass("bg-green-200", "text-green-800");
  });

  it("does not render message when message prop is an empty string", () => {
    render(<MessageAlert message="" type="error" />);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("does not render message when message prop is null", () => {
    render(<MessageAlert message={null} type="error" />);
    expect(screen.queryByRole("alert")).toBeNull();
  });
});

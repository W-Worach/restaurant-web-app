import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "@/components/auth/RegisterForm";
import { register } from "@/services/AuthService";
import "@testing-library/jest-dom";

jest.mock("@/services/AuthService", () => ({
  register: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: "",
    asPath: "",
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("validates user input and displays error messages", async () => {
    render(<RegisterForm />);
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await userEvent.type(screen.getByLabelText("Username:"), "testuser");
    await userEvent.type(screen.getByLabelText("Email:"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password:"), "short");
    await userEvent.type(screen.getByLabelText("Confirm password:"), "short");

    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    const passwordError = await screen.findByText(
      "Password must be at least 8 characters long."
    );
    expect(passwordError).toBeInTheDocument();

    await userEvent.clear(screen.getByLabelText("Password:"));
    await userEvent.clear(screen.getByLabelText("Confirm password:"));
    await userEvent.type(screen.getByLabelText("Password:"), "Password123");
    await userEvent.type(screen.getByLabelText("Confirm password:"), "Password123");
  
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
  
    const complexPasswordError = await screen.findByText(/The password must contain small and capital letters, numbers and special characters./i);
    expect(complexPasswordError).toBeInTheDocument();
  });

  it("calls register on form submit with correct credentials and handles success", async () => {
    register.mockResolvedValue({ token: "fake-token" });

    render(<RegisterForm />);
    await userEvent.type(screen.getByLabelText("Username:"), "testuser");
    await userEvent.type(screen.getByLabelText("Email:"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password:"), "Password123!");
    await userEvent.type(
      screen.getByLabelText("Confirm password:"),
      "Password123!"
    );
    userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith(
        "testuser",
        "test@example.com",
        "Password123!"
      );
      expect(localStorage.setItem).toHaveBeenCalledWith("token", "fake-token");
    });
  });

  it("handles registration failure correctly", async () => {
    const errorMessage = "Registration unsuccessful. Try again.";
    register.mockRejectedValue(new Error("Invalid credentials"));

    render(<RegisterForm />);
    await userEvent.type(screen.getByLabelText("Username:"), "testuser");
    await userEvent.type(screen.getByLabelText("Email:"), "test@example.com");
    await userEvent.type(screen.getByLabelText("Password:"), "Password123!");
    await userEvent.type(
      screen.getByLabelText("Confirm password:"),
      "Password123!"
    );
    userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});

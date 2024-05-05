import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/auth/LoginForm";
import * as AuthService from "@/services/AuthService";
import "@testing-library/jest-dom";

jest.mock("@/services/AuthService", () => ({
  login: jest.fn(),
}));

describe("LoginForm", () => {
  let originalLocation;

  beforeAll(() => {
    originalLocation = window.location;
    delete window.location;
    window.location = { href: "" };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  beforeEach(() => {
    Storage.prototype.setItem = jest.fn();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("calls login on form submit with correct credentials", async () => {
    AuthService.login.mockResolvedValue({
      token: "fake-token",
      userId: "fake-user-id",
    });

    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText("Username:"), "testuser");
    await userEvent.type(screen.getByLabelText("Password:"), "Password123!");
    userEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledWith("testuser", "Password123!");
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "fake-token");
    expect(localStorage.setItem).toHaveBeenCalledWith("userId", "fake-user-id");
    expect(window.location.href).toBe("/");
  });

  it("handles login failure correctly", async () => {
    AuthService.login.mockRejectedValue(new Error("Invalid credentials"));

    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText("Username:"), "testuser");
    await userEvent.type(screen.getByLabelText("Password:"), "wrongpassword");
    userEvent.click(screen.getByRole("button", { name: "Login" }));

    await screen.findByText(
      /Failed login. Please check your details and try again\./i
    );
  });
});

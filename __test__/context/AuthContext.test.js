import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider, AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("jwt-decode", () => jest.fn());

const mockPush = jest.fn();
useRouter.mockImplementation(() => ({
  push: mockPush,
}));

const setup = (initialState = {}) => {
  localStorage.setItem("token", initialState.token || "");
  localStorage.setItem("userId", initialState.userId || "");
  jwtDecode.mockImplementation(() => ({
    exp: initialState.exp || Date.now() / 1000 + 1000,
  }));

  render(
    <AuthProvider>
      <AuthContext.Consumer>
        {({ isLoggedIn, userId, token, logout }) => (
          <div>
            <div>Logged In: {isLoggedIn.toString()}</div>
            <div>User ID: {userId}</div>
            <div>Token: {token}</div>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
};

describe("AuthProvider", () => {
  afterEach(() => {
    localStorage.clear();
    jwtDecode.mockClear();
    mockPush.mockClear();
  });

  test("redirects to home and logs out on expired token", async () => {
    setup({
      token: "expired-token",
      userId: "123",
      exp: Date.now() / 1000 - 500,
    });
    expect(screen.getByText("Logged In: false")).toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  test("initializes as logged out when no token is present", async () => {
    setup();
    expect(screen.getByText("Logged In: false")).toBeInTheDocument();
  });

  test("logout function works correctly", async () => {
    setup({
      token: "valid-token",
      userId: "123",
      exp: Date.now() / 1000 + 500,
    });
    fireEvent.click(screen.getByText("Logout"));
    expect(screen.getByText("Logged In: false")).toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});

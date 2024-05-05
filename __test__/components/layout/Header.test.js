import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/components/layout/Header";
import { AuthContext } from "@/context/AuthContext";

describe("Header Component Tests", () => {
  test("renders correctly when user is not logged in", () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: false }}>
        <Header />
      </AuthContext.Provider>
    );

    expect(screen.getByText("Restaurant-APP")).toBeInTheDocument();
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.queryByText("Reservations")).not.toBeInTheDocument();
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
    expect(screen.queryByText("Log out")).not.toBeInTheDocument();
  });

  test("renders correctly when user is logged in", () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <Header />
      </AuthContext.Provider>
    );

    expect(screen.getByText("Restaurant-APP")).toBeInTheDocument();
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Reservations")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
    expect(screen.queryByText("Log in")).not.toBeInTheDocument();
    expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
  });

  test("calls logout function when 'Log out' button is clicked", () => {
    const logoutMock = jest.fn();

    render(
      <AuthContext.Provider value={{ isLoggedIn: true, logout: logoutMock }}>
        <Header />
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByText("Log out"));
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});

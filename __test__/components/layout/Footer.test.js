import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";
import { BrowserRouter } from "react-router-dom";

describe("Footer Component Tests", () => {
  it("renders correctly", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const copyrightText = screen.getByText("© 2024 Restaurant-APP. All rights reserved.");
    expect(copyrightText).toBeInTheDocument();

    const contactLink = screen.getByText("Contact");
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest("a")).toHaveAttribute("href", "/contact");

    const termsLink = screen.getByText("Terms");
    expect(termsLink).toBeInTheDocument();
    expect(termsLink.closest("a")).toHaveAttribute("href", "/terms");
  });
});

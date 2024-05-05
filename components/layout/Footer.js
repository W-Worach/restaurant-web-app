import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <span>© 2024 Restaurant-APP. All rights reserved.</span>
        <nav className="footer-nav flex">
          <Link
            href="/contact"
            className="px-3 py-2 hover:text-gray-300 transition duration-200"
          >
            Contact
          </Link>
          <Link
            href="/terms"
            className="px-3 py-2 hover:text-gray-300 transition duration-200"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

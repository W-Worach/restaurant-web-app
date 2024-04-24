import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <span>© 2024 Restaurant-APP. Wszelkie prawa zastrzeżone.</span>
        <nav className="footer-nav flex">
          <Link
            href="/contact"
            className="px-3 py-2 hover:text-gray-300 transition duration-200"
          >
            Kontakt
          </Link>
          <Link
            href="/terms"
            className="px-3 py-2 hover:text-gray-300 transition duration-200"
          >
            Regulamin
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;

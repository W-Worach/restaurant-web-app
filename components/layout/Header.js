import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 w-full z-30">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition duration-200"
        >
          Restaurant-APP
        </Link>
        <div className="nav-links flex space-x-6">
          <Link
            href="/menu"
            className="text-gray-900 hover:text-blue-600 transition duration-200"
          >
            Menu
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href="/user"
                className="text-gray-900 hover:text-blue-600 transition duration-200"
              >
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-900 hover:text-blue-600 transition duration-200"
              >
                Wyloguj się
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-900 hover:text-blue-600 transition duration-200"
              >
                Logowanie
              </Link>
              <Link
                href="/register"
                className="text-gray-900 hover:text-blue-600 transition duration-200"
              >
                Rejestracja
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

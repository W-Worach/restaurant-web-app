import React from "react";
import Link from "next/link";
import { FaList, FaShoppingCart, FaLock } from "react-icons/fa";

export default function UserPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start py-8">
      <div className="container mx-auto p-6 bg-white shadow-md rounded-md max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Panel Użytkownika
        </h1>
        <p className="text-lg text-center mb-4">
          Welcome to your user panel. Here you can manage your reservations,
          orders, and change your password.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <Link
            href="/user/reservations"
            className="flex items-center justify-center text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 w-full"
          >
            <FaList className="mr-2" /> My Reservations
          </Link>
          <Link
            href="/user/orders"
            className="flex items-center justify-center text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 w-full"
          >
            <FaShoppingCart className="mr-2" /> My Orders
          </Link>
          <Link
            href="/user/changepassword"
            className="flex items-center justify-center text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border border-blue-700 w-full"
          >
            <FaLock className="mr-2" /> Change My Password
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";

export default function UserPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Panel Użytkownika</h1>
      <div className="flex flex-col items-center space-y-4">
        <Link
          href="/user/reservations"
          className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          My Reservations
        </Link>
        <Link
          href="/user/orders"
          className="text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          My Orders
        </Link>
      </div>
    </div>
  );
}

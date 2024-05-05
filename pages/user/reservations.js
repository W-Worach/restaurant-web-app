import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  getAllUserReservations,
  deleteUserReservation,
} from "@/services/ReservationsService";
import ReservationsList from "@/components/userReservations/ReseravationsList";

const ReservationsPage = () => {
  const { userId, token } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (userId && token) {
      setLoading(true);
      getAllUserReservations(token, userId)
        .then((data) => {
          setReservations(data.reverse());
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [userId, token]);

  const handleDeleteReservation = async (reservationId) => {
    try {
      await deleteUserReservation(token, reservationId);
      setReservations((prev) => prev.filter((res) => res.id !== reservationId));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "active") {
      let now = new Date();
      let from = new Date(reservation.from);
      return from > now;
    } else if (filter === "completed") {
      let now = new Date();
      let to = new Date(reservation.to);
      return to <= now;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-blue-500">Ładowanie...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }

  console.log("setError is:", typeof setError);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-gray-50">
      <h1 className="text-2xl font-bold text-center mb-6">Your Reservations</h1>
      <p className="text-center mb-6 text-gray-600">
        Reservations can only be cancelled 24 hours in advance.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`py-2 px-10 font-bold rounded ${filter === "all" ? "bg-blue-500 text-white" : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"} w-40`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`py-2 px-10 font-bold rounded ${filter === "active" ? "bg-blue-500 text-white" : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"} w-40`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`py-2 px-10 font-bold rounded ${filter === "completed" ? "bg-blue-500 text-white" : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"} w-40`}
        >
          Completed
        </button>
      </div>
      <ReservationsList
        reservations={filteredReservations}
        onDelete={handleDeleteReservation}
        setReservations={setReservations}
        setError={setError}
      />
    </div>
  );
};

export default ReservationsPage;

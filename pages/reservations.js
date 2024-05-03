import React, { useState, useEffect, useContext } from "react";
import { getAllReservations } from "@/services/ReservationsService";
import { AuthContext } from "@/context/AuthContext";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const reservationData = await getAllReservations(token);
        setReservations(reservationData);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    fetchReservations();
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Current Reservations</h1>
      {isLoading ? (
        <p>Loading reservations...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <ul>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <li
                key={reservation.id}
                className="mb-4 p-2 border rounded shadow-sm"
              >
                <p>
                  <strong>Reservation ID:</strong> {reservation.id}
                </p>
                <p>
                  <strong>From:</strong>{" "}
                  {new Date(reservation.from).toLocaleString()}
                </p>
                <p>
                  <strong>To:</strong>{" "}
                  {new Date(reservation.to).toLocaleString()}
                </p>
                <p>
                  <strong>Table ID:</strong> {reservation.tableModelId}
                </p>
              </li>
            ))
          ) : (
            <p>No current reservations found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ReservationsPage;

import React from "react";
import moment from "moment";

const ReservationsList = ({
  reservations,
  onDelete,
  setReservations,
  setError, 
}) => {
  const isMoreThan24HoursAhead = (reservationDate) => {
    const now = moment();
    const reservationMoment = moment(reservationDate);
    return reservationMoment.diff(now, "hours") > 24;
  };

  const handleDelete = async (reservationId) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        await onDelete(reservationId);
        setReservations((prev) =>
          prev.filter((res) => res.id !== reservationId)
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="p-4 bg-white rounded shadow mb-4"
          >
            <h3 className="font-bold text-lg">
              Reservation at Table {reservation.tableModelId}
            </h3>
            <p>
              {moment(reservation.from).format("YYYY-MM-DD HH:mm")} to{" "}
              {moment(reservation.to).format("YYYY-MM-DD HH:mm")}
            </p>
            {isMoreThan24HoursAhead(reservation.from) && (
              <button
                onClick={() => handleDelete(reservation.id)}
                className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete Reservation
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-lg">No reservations found.</p>
      )}
    </div>
  );
};

export default ReservationsList;

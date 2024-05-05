import React, { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import TableSelector from "@/components/reservations/TableSelector";
import DatePicker from "@/components/reservations/DatePicker";
import TimeRangePicker from "@/components/reservations/TimeRangePicker";
import useReservationData from "@/hooks/useReservationData";
import MessageAlert from "@/components/reservations/MessageAlert";
import moment from "moment";

const ReservationsPage = () => {
  const { token, userId } = useContext(AuthContext);
  const {
    tables,
    filteredReservations,
    addReservation,
    filterReservations,
  } = useReservationData(token);

  const [selectedTableId, setSelectedTableId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeRange, setTimeRange] = useState({ from: "", to: "" });
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleTableChange = (e) => {
    setSelectedTableId(e.target.value);
    filterReservations(e.target.value, selectedDate);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    filterReservations(selectedTableId, e.target.value);
  };

  const handleTimeChange = (field, value) =>
    setTimeRange((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");
    if (!selectedTableId || !selectedDate || !timeRange.from || !timeRange.to) {
      setFormError("Please complete all fields.");
      return;
    }

    const selectedFromDate = moment(`${selectedDate}T${timeRange.from}`).format("YYYY-MM-DDTHH:mm:ss");
    const selectedToDate = moment(`${selectedDate}T${timeRange.to}`).format("YYYY-MM-DDTHH:mm:ss");

    try {
      const message = await addReservation({
        from: selectedFromDate,
        to: selectedToDate,
        identityUserId: userId,
        tableModelId: selectedTableId,
      });
      setSuccessMessage(`Succes: ${message}`);
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Create a Booking</h1>
      <MessageAlert message={formError} type="error" />
      <MessageAlert message={successMessage} type="success" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <TableSelector
          tables={tables}
          selectedTableId={selectedTableId}
          onTableChange={handleTableChange}
        />
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <TimeRangePicker
          timeRange={timeRange}
          onTimeChange={handleTimeChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Reservation
        </button>
        {filteredReservations.length > 0 && (
          <div className="mt-4 bg-white shadow overflow-hidden rounded-lg">
            <h3 className="text-lg font-bold text-center p-4 border-b">
              Current Reservations for Table {selectedTableId} on {selectedDate}
              :
            </h3>
            <ul>
              {filteredReservations.map((reservation) => (
                <li
                  key={reservation.id}
                  className="px-6 py-2 border-b last:border-b-0"
                >
                  <p className="text-gray-900 text-center">
                    {moment(reservation.from).format("HH:mm")} -{" "}
                    {moment(reservation.to).format("HH:mm")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default ReservationsPage;

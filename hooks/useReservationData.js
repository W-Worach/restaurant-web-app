import { useState, useEffect } from "react";
import {
  getAllReservations,
  createReservation,
} from "@/services/ReservationsService";
import { getTables } from "@/services/TablesService";
import moment from "moment";

const useReservationData = (token) => {
  const [data, setData] = useState({ tables: [], reservations: [] });
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const tablesResponse = await getTables();
      const reservationsResponse = token ? await getAllReservations(token) : [];
      setData({ tables: tablesResponse, reservations: reservationsResponse });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const filterReservations = (selectedTableId, selectedDate) => {
    if (!selectedTableId || !selectedDate) {
      setFilteredReservations([]);
      return;
    }
    const filtered = data.reservations
      .filter((reservation) => {
        return (
          reservation.tableModelId.toString() === selectedTableId.toString() &&
          moment(reservation.from).format("YYYY-MM-DD") === selectedDate
        );
      })
      .sort((a, b) => new Date(a.from) - new Date(b.from));

    setFilteredReservations(filtered);
  };

  const addReservation = async (reservationDetails) => {
    if (!token) {
      console.log("Token not available");
      return "Token not available";
    }

    setIsLoading(true);
    try {
      const message = await createReservation(reservationDetails, token);
      await fetchData();
      return message;
    } catch (error) {
      setError(error.message);
      return error.message;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tables: data.tables,
    reservations: data.reservations,
    filteredReservations,
    isLoading,
    error,
    addReservation,
    filterReservations,
    fetchData,
  };
};

export default useReservationData;

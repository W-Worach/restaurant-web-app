import { renderHook, act, waitFor } from "@testing-library/react";
import useReservationData from "@/hooks/useReservationData";
import {
  getAllReservations,
  createReservation,
} from "@/services/ReservationsService";
import { getTables } from "@/services/TablesService";

jest.mock("@/services/ReservationsService", () => ({
  getAllReservations: jest.fn(),
  createReservation: jest.fn(),
}));

jest.mock("@/services/TablesService", () => ({
  getTables: jest.fn(),
}));

describe("useReservationData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const token = "test-token";

  it("fetches tables and reservations on initialization", async () => {
    const tables = [{ id: 1, name: "Table 1" }];
    const reservations = [
      { id: 1, tableModelId: 1, from: "2022-01-01T12:00:00" },
    ];

    getTables.mockResolvedValue(tables);
    getAllReservations.mockResolvedValue(reservations);

    const { result } = renderHook(() => useReservationData(token));

    await waitFor(() => {
      expect(result.current.tables).toEqual(tables);
      expect(result.current.reservations).toEqual(reservations);
    });

    expect(result.current.isLoading).toBeFalsy();
    expect(getTables).toHaveBeenCalled();
    expect(getAllReservations).toHaveBeenCalledWith(token);
  });

  it("handles errors during fetch", async () => {
    const errorMessage = "Failed to fetch";
    getTables.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useReservationData(token));

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.isLoading).toBeFalsy();
    });
  });

  it("adds a reservation and updates data", async () => {
    const message = "Reservation created";
    createReservation.mockResolvedValue(message);
    getAllReservations.mockResolvedValue([]);
    getTables.mockResolvedValue([]);

    const { result } = renderHook(() => useReservationData(token));

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    let response;
    await act(async () => {
      response = await result.current.addReservation({
        tableModelId: 1,
        date: "2022-01-01",
      });
    });

    expect(response).toBe(message);
    expect(createReservation).toHaveBeenCalled();
    expect(getAllReservations).toHaveBeenCalledTimes(2);
  });
});

import {
  getAllReservations,
  createReservation,
  getAllUserReservations,
  deleteUserReservation,
} from "@/services/ReservationsService";
import config from "@/services/_config";

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ReservationService", () => {
  const token = "fake-token";

  describe("getAllReservations", () => {
    it("should fetch all reservations successfully", async () => {
      const mockReservations = [{ id: 1, date: "2024-01-01" }];
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockReservations),
        statusText: "OK",
      });

      const result = await getAllReservations(token);
      expect(fetch).toHaveBeenCalledWith(
        `${config.apiUrl}/GetReservations-MobileWeb`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toEqual(mockReservations);
    });

    it("should throw an error if fetching reservations fails", async () => {
      fetch.mockResolvedValue({
        ok: false,
        statusText: "Not Found",
      });

      await expect(getAllReservations(token)).rejects.toThrow(
        "Problem with downloading reservations. Not Found"
      );
    });
  });

  describe("createReservation", () => {
    const reservationData = { id: 2, date: "2024-01-02" };

    it("should create a reservation successfully", async () => {
      const responseText = "Reservation created";
      fetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(responseText),
      });

      const result = await createReservation(reservationData, token);
      expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/api/reservation`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });
      expect(result).toEqual(responseText);
    });

    it("should throw an error if creating reservation fails", async () => {
      const errorText = "Failed to create";
      fetch.mockResolvedValue({
        ok: false,
        text: () => Promise.resolve(errorText),
      });

      await expect(createReservation(reservationData, token)).rejects.toThrow(
        errorText
      );
    });
  });

  describe("getAllUserReservations", () => {
    const userId = "user123";

    it("should fetch all reservations for a specific user successfully", async () => {
      const mockUserReservations = [{ id: 3, date: "2024-01-03", userId }];
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUserReservations),
        statusText: "OK",
      });

      const result = await getAllUserReservations(token, userId);
      expect(fetch).toHaveBeenCalledWith(
        `${config.apiUrl}/GetAllUserReservations/${userId}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toEqual(mockUserReservations);
    });

    it("should throw an error if fetching user reservations fails", async () => {
      fetch.mockResolvedValue({
        ok: false,
        statusText: "Internal Server Error",
      });

      await expect(getAllUserReservations(token, userId)).rejects.toThrow(
        "Problem with downloading reservations. Internal Server Error"
      );
    });
  });

  describe("deleteUserReservation", () => {
    const reservationId = "res123";

    it("should delete a user reservation successfully", async () => {
      const jsonResponse = { message: "Reservation deleted successfully" };
      fetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(jsonResponse)), // Ensure the mocked response is a JSON string
      });

      const result = await deleteUserReservation(token, reservationId);
      expect(fetch).toHaveBeenCalledWith(
        `${config.apiUrl}/ReservationDelete-User/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toEqual(jsonResponse); // Expect the actual JSON object
    });

    it("should handle a non-empty successful response correctly", async () => {
      const jsonResponse = { message: "Successfully deleted" };
      fetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(jsonResponse)),
      });

      const result = await deleteUserReservation(token, reservationId);
      expect(result).toEqual(jsonResponse);
    });

    it("should throw an error if deleting reservation fails", async () => {
      const errorMessage = "Not Authorized";
      fetch.mockResolvedValue({
        ok: false,
        statusText: "Not Authorized",
        text: () => Promise.resolve(errorMessage),
      });

      await expect(deleteUserReservation(token, reservationId)).rejects.toThrow(
        "Problem with deleting reservations. Not Authorized"
      );
    });

    it("should throw an error when there's an issue parsing the response", async () => {
      fetch.mockResolvedValue({
        ok: true,
        text: () => Promise.reject(new Error("Invalid JSON")),
      });

      await expect(deleteUserReservation(token, reservationId)).rejects.toThrow(
        "Error parsing response: Invalid JSON"
      );
    });
  });
});

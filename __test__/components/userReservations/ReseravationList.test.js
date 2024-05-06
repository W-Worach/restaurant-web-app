import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import moment from "moment";
import ReservationsList from "@/components/userReservations/ReseravationsList";
import { advanceTo, clear } from "jest-date-mock";

const mockReservations = [
  {
    id: 1,
    tableModelId: 1,
    from: moment().add(25, "hours").toISOString(),
    to: moment().add(26, "hours").toISOString(),
  },
  {
    id: 2,
    tableModelId: 2,
    from: moment().add(27, "hours").toISOString(),
    to: moment().add(28, "hours").toISOString(),
  },
];

describe("ReservationsList Component Tests", () => {
    beforeEach(() => {
        advanceTo(new Date(2023, 4, 6, 0, 0, 0));
        jest.spyOn(window, "confirm").mockImplementation(() => true);
      });

      afterEach(() => {
        clear();
        jest.clearAllMocks();
      });

  it("renders list of reservations correctly", () => {
    render(
      <ReservationsList
        reservations={mockReservations}
        onDelete={() => {}}
        setReservations={() => {}}
        setError={() => {}}
      />
    );

    mockReservations.forEach((reservation) => {
      const fromText = moment(reservation.from).format("YYYY-MM-DD HH:mm");
      const toText = moment(reservation.to).format("YYYY-MM-DD HH:mm");

      expect(
        screen.getByText(`Reservation at Table ${reservation.tableModelId}`)
      ).toBeInTheDocument();
      expect(screen.getByText(new RegExp(fromText, "i"))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(toText, "i"))).toBeInTheDocument();
    });
  });

  it("handles deletion of reservations", async () => {
    const onDeleteMock = jest.fn();
    const setReservationsMock = jest.fn();
    const setErrorMock = jest.fn();

    render(
      <ReservationsList
        reservations={mockReservations}
        onDelete={onDeleteMock}
        setReservations={setReservationsMock}
        setError={setErrorMock}
      />
    );

    const deleteButton = screen.getByTestId(
      `delete-button-${mockReservations[0].id}`
    );
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(window.confirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this reservation?"
    );
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(mockReservations[0].id);
    expect(setErrorMock).not.toHaveBeenCalled();
  });

  it("displays 'No reservations found' message when there are no reservations", () => {
    render(
      <ReservationsList
        reservations={[]}
        onDelete={() => {}}
        setReservations={() => {}}
        setError={() => {}}
      />
    );

    expect(screen.getByText("No reservations found.")).toBeInTheDocument();
  });
});

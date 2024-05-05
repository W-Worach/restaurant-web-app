import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableSelector from "@/components/reservations/TableSelector";

const mockTables = [
  { id: 1, numberOfSeats: 4 },
  { id: 2, numberOfSeats: 6 },
];

describe("TableSelector Component Tests", () => {
  it("renders correctly with provided tables and selected table ID", () => {
    const selectedTableId = 2;
    render(
      <TableSelector
        tables={mockTables}
        selectedTableId={selectedTableId}
        onTableChange={() => {}}
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue(selectedTableId.toString());

    mockTables.forEach((table) => {
      const optionText = `Table ${table.id} - ${table.numberOfSeats} chairs`;
      const optionElement = screen.getByText(optionText);
      expect(optionElement).toBeInTheDocument();
      expect(optionElement).toHaveValue(table.id.toString());
    });
  });
});

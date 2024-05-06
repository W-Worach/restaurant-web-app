import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableSelector from "@/components/tables/TableSelectorWithAvailability";

const mockTables = [
  { id: 1, numberOfSeats: 4, isAvailable: true },
  { id: 2, numberOfSeats: 6, isAvailable: false },
];

describe("TableSelector Component Tests", () => {
  it("renders correctly with provided tables and selected table ID", () => {
    const selectedTableId = 2;
    render(
      <TableSelector
        tables={mockTables}
        selectedTableId={selectedTableId}
        onTableSelect={() => {}}
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue(selectedTableId.toString());

    mockTables.forEach((table) => {
      const optionText = `Table ${table.id} - ${table.numberOfSeats} chairs (${table.isAvailable ? 'Available' : 'Unavailable'})`;
      const optionElement = screen.getByText(optionText);
      expect(optionElement).toBeInTheDocument();
      expect(optionElement).toHaveValue(table.id.toString());
      if (!table.isAvailable) {
        expect(optionElement).toHaveAttribute('disabled');
      } else {
        expect(optionElement).not.toHaveAttribute('disabled');
      }
    });
  });

  it("triggers onTableSelect with the correct table ID when a different table is selected", () => {
    const onTableSelect = jest.fn();
    render(
      <TableSelector
        tables={mockTables}
        selectedTableId={null}
        onTableSelect={onTableSelect}
      />
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "2" } });

    expect(onTableSelect).toHaveBeenCalledTimes(1);
    expect(onTableSelect).toHaveBeenCalledWith(2);
  });
});

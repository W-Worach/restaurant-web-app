import React from "react";

const TableSelector = ({ tables, selectedTableId, onTableSelect }) => {
  return (
    <div className="table-selector mb-2">
      <select
        value={selectedTableId || ""}
        onChange={(e) => onTableSelect(Number(e.target.value))}
      >
        <option value="" disabled>
          Wybierz stół...
        </option>
        {tables.map((table) => (
          <option key={table.id} value={table.id} disabled={!table.isAvailable}>
            Stół {table.id} - {table.numberOfSeats} Siedzeń (
            {table.isAvailable ? "Available" : "Unavailable"})
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableSelector;

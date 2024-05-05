import React from "react";

const TableSelector = ({ tables, selectedTableId, onTableSelect }) => {
  return (
    <div className="table-selector mb-2">
      <select
        value={selectedTableId || ""}
        onChange={(e) => onTableSelect(Number(e.target.value))}
      >
        <option value="" disabled>
          Choose Table...
        </option>
        {tables.map((table) => (
          <option key={table.id} value={table.id} disabled={!table.isAvailable}>
            Table {table.id} - {table.numberOfSeats} chairs (
            {table.isAvailable ? "Available" : "Unavailable"})
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableSelector;

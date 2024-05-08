import React from "react";

const TableSelectorWithAvailability = ({ tables, selectedTableId, onTableSelect }) => {
  return (
    <div className="flex flex-col items-center my-2">
      <select
        id="table-select"
        value={selectedTableId || ""}
        onChange={(e) => onTableSelect(Number(e.target.value))}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="" disabled>
          Choose Table...
        </option>
        {tables.map((table) => (
          <option key={table.id} value={table.id} disabled={!table.isAvailable}>
            Table {table.id} - {table.numberOfSeats} chairs ({table.isAvailable ? "Available" : "Unavailable"})
          </option>
        ))}
      </select>
    </div>
  );
};

const TableSelector = ({ tables, selectedTableId, onTableChange }) => {
  return (
    <div className="flex flex-col items-center">
      <label className="block text-lg font-medium text-gray-700">Table ID:</label>
      <select
        value={selectedTableId}
        onChange={onTableChange}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Choose Table...</option>
        {tables.map((table) => (
          <option key={table.id} value={table.id}>
            Table {table.id} - {table.numberOfSeats} chairs
          </option>
        ))}
      </select>
    </div>
  );
};

export { TableSelector, TableSelectorWithAvailability};

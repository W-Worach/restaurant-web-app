import React from "react";

const TimeRangePicker = ({ timeRange, onTimeChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col items-center">
        <label
          htmlFor="fromInput"
          className="block text-lg font-medium text-gray-700"
        >
          From:
        </label>
        <input
          id="fromInput"
          type="time"
          value={timeRange.from}
          onChange={(e) => onTimeChange("from", e.target.value)}
          min="00:00"
          max="23:59"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex flex-col items-center">
        <label
          htmlFor="toInput"
          className="block text-lg font-medium text-gray-700"
        >
          To:
        </label>
        <input
          id="toInput"
          type="time"
          value={timeRange.to}
          onChange={(e) => onTimeChange("to", e.target.value)}
          min="00:00"
          max="23:59"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default TimeRangePicker;

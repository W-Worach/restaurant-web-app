import React from 'react';
import moment from 'moment';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const minDate = moment().add(1, 'days').format('YYYY-MM-DD'); 

  return (
    <div className="flex flex-col items-center">
      <label className="block text-lg font-medium text-gray-700">Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={onDateChange}
        min={minDate}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default DatePicker;

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from '@/components/reservations/DatePicker';
import moment from 'moment';

describe('DatePicker Component Tests', () => {
  it('renders correctly with default props', () => {
    const selectedDate = '2024-05-06';
    const onDateChange = jest.fn();

    render(<DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />);

    const labelElement = screen.getByText('Date:');
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByLabelText('Date:');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'date');
    expect(inputElement).toHaveAttribute('value', selectedDate);
    expect(inputElement).toHaveAttribute('min', moment().add(1, 'days').format('YYYY-MM-DD'));
  });

  it('triggers onDateChange when date is changed', () => {
    const selectedDate = '2024-05-06';
    const onDateChange = jest.fn();

    render(<DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />);

    const inputElement = screen.getByLabelText('Date:');
    fireEvent.change(inputElement, { target: { value: '2024-05-07' } });

    expect(onDateChange).toHaveBeenCalledTimes(1);
    expect(onDateChange).toHaveBeenCalledWith(expect.anything());
  });
});

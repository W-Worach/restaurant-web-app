import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeRangePicker from '@/components/reservations/TimeRangePicker';

describe('TimeRangePicker Component Tests', () => {
  const mockTimeRange = {
    from: '10:00',
    to: '12:00',
  };

  it('renders correctly with provided time range', () => {
    render(<TimeRangePicker timeRange={mockTimeRange} onTimeChange={() => {}} />);

    const fromInput = screen.getByLabelText('From:');
    const toInput = screen.getByLabelText('To:');

    expect(fromInput).toBeInTheDocument();
    expect(fromInput).toHaveValue(mockTimeRange.from);

    expect(toInput).toBeInTheDocument();
    expect(toInput).toHaveValue(mockTimeRange.to);
  });

  it('triggers onTimeChange with the correct arguments when time inputs change', () => {
    const mockOnTimeChange = jest.fn();
    render(<TimeRangePicker timeRange={mockTimeRange} onTimeChange={mockOnTimeChange} />);

    const fromInput = screen.getByLabelText('From:');
    const toInput = screen.getByLabelText('To:');

    fireEvent.change(fromInput, { target: { value: '09:00' } });
    expect(mockOnTimeChange).toHaveBeenCalledTimes(1);
    expect(mockOnTimeChange).toHaveBeenCalledWith('from', '09:00');

    fireEvent.change(toInput, { target: { value: '13:00' } });
    expect(mockOnTimeChange).toHaveBeenCalledTimes(2);
    expect(mockOnTimeChange).toHaveBeenCalledWith('to', '13:00');
  });
});

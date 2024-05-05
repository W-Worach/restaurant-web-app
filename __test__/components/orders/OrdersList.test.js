import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OrdersList from "@/components/orders/OrdersList";

const mockOrders = [
  {
    id: 1,
    status: 1,
    price: 25.99,
    tableModel: { id: 1, numberOfSeats: 4 },
    dishModels: [{ id: 1, name: "Pizza", price: 15.99 }],
  },
  {
    id: 2,
    status: 2,
    price: 32.5,
    tableModel: { id: 2, numberOfSeats: 2 },
    dishModels: [{ id: 2, name: "Pasta", price: 12.5 }],
  },
];

describe("OrdersList Component Tests", () => {
  it("renders correctly with active orders", () => {
    render(<OrdersList orders={mockOrders} />);
    
    expect(screen.getByText("Order number: 1")).toBeInTheDocument();
    expect(screen.getByText("Order number: 2")).toBeInTheDocument();
    
    expect(screen.getByText("Status: Ready")).toBeInTheDocument();
    expect(screen.getByText("Status: Working")).toBeInTheDocument();
    
    expect(screen.getByText("Cost: 25,99 zł")).toBeInTheDocument();
    expect(screen.getByText("Cost: 32,50 zł")).toBeInTheDocument();
    
    expect(screen.getByText("Table number: 1 (Number of seats: 4)")).toBeInTheDocument();
    expect(screen.getByText("Table number: 2 (Number of seats: 2)")).toBeInTheDocument();
    
    expect(screen.getByText("Pizza - 15,99 zł")).toBeInTheDocument();
    expect(screen.getByText("Pasta - 12,50 zł")).toBeInTheDocument();
    
    expect(screen.getByRole("button", { name: "Mark as Ready for Payment" })).toBeInTheDocument();
  });

  it("renders correctly with no active orders", () => {
    render(<OrdersList orders={[]} />);
    
    expect(screen.getByText("No active orders.")).toBeInTheDocument();
  });

  it("triggers onStatusChange when 'Mark as Ready for Payment' button is clicked", () => {
    const mockOnStatusChange = jest.fn();
    render(<OrdersList orders={mockOrders} onStatusChange={mockOnStatusChange} />);
    
    const markAsReadyButton = screen.getByRole("button", { name: "Mark as Ready for Payment" });
    fireEvent.click(markAsReadyButton);
    
    expect(mockOnStatusChange).toHaveBeenCalledWith(1, 3);
  });
});

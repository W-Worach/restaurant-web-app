import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "@/components/cart/Cart";

const mockItems = [
  { item: { id: 1, name: "Product 1", price: 10 }, quantity: 2 },
  { item: { id: 2, name: "Product 2", price: 20 }, quantity: 1 },
];

const removeFromCart = jest.fn();
const updateQuantity = jest.fn();
const submitOrder = jest.fn();
const setOrderStatus = jest.fn();

describe("Cart Component Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders cart items correctly and calculates the total price", () => {
    render(
      <Cart
        items={mockItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        submitOrder={submitOrder}
        orderStatus=""
        setOrderStatus={setOrderStatus}
      />
    );

    const totalPrice = mockItems.reduce(
      (sum, { item, quantity }) => sum + item.price * quantity,
      0
    );
    expect(screen.getByText(`Total: ${totalPrice} zł`)).toBeInTheDocument();
    mockItems.forEach(({ item, quantity }) => {
      const priceText = `Price: ${item.price * quantity} zł`;
      const priceDisplays = screen.getAllByText(priceText);
      expect(priceDisplays.length).toBeGreaterThan(0);
    });
  });

  it("calls removeFromCart when delete button is clicked", () => {
    render(
      <Cart
        items={mockItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        submitOrder={submitOrder}
        orderStatus=""
        setOrderStatus={setOrderStatus}
      />
    );

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);
    expect(removeFromCart).toHaveBeenCalledWith(mockItems[0].item);
  });

  it("calls removeFromCart when delete button is clicked", () => {
    render(
      <Cart
        items={mockItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        submitOrder={submitOrder}
        orderStatus=""
        setOrderStatus={setOrderStatus}
      />
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(removeFromCart).toHaveBeenCalledWith(mockItems[0].item);
  });

  it("displays order status and disables order button if cart is empty", () => {
    render(
      <Cart
        items={[]}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        submitOrder={submitOrder}
        orderStatus="Order placed successfully"
        setOrderStatus={setOrderStatus}
      />
    );

    expect(screen.getByText("Order placed successfully")).toBeInTheDocument();
    const orderButton = screen.queryByRole("button", {
      name: "Place your order",
    });
    expect(orderButton).toBeNull();
  });
});

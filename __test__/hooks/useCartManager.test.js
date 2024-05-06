import { renderHook, act } from "@testing-library/react";
import useCartManager from "@/hooks/useCartManager";
import { createOrder } from "@/services/OrderService";

jest.mock("@/services/OrderService", () => ({
  createOrder: jest.fn(),
}));

describe("useCartManager", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with an empty cart and no order status", () => {
    const { result } = renderHook(() => useCartManager());
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.orderStatus).toBe("");
  });

  it("should add an item to the cart", () => {
    const { result } = renderHook(() => useCartManager());
    const item = { id: 1, name: "Pizza" };

    act(() => {
      result.current.addToCart(item);
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0]).toEqual({ item, quantity: 1 });
  });

  it("should remove an item from the cart", () => {
    const { result } = renderHook(() => useCartManager());
    const item = { id: 1, name: "Pizza" };

    act(() => {
      result.current.addToCart(item);
      result.current.removeFromCart(item);
    });

    expect(result.current.cartItems.length).toBe(0);
  });

  it("should update the quantity of an item in the cart", () => {
    const { result } = renderHook(() => useCartManager());
    const item = { id: 1, name: "Pizza" };

    act(() => {
      result.current.addToCart(item);
      result.current.updateQuantity(item, 3);
    });

    expect(result.current.cartItems[0].quantity).toBe(3);
  });

  it("handles order submission successfully", async () => {
    const mockOrderResponse = "Order ID: 123";
    createOrder.mockResolvedValue(mockOrderResponse);
    const { result } = renderHook(() => useCartManager());

    await act(async () => {
      result.current.addToCart({ id: 1, name: "Pizza" });
    });

    await act(async () => {
      await result.current.submitOrder(1, "user123", "token123");
    });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.orderStatus).toBe("The order was placed correctly!");
    expect(createOrder).toHaveBeenCalled();
  });

  it("handles order submission error", async () => {
    const mockError = new Error("Failed to submit order");
    createOrder.mockRejectedValue(mockError);
    const { result } = renderHook(() => useCartManager());

    await act(async () => {
      result.current.addToCart({ id: 1, name: "Pizza" });
    });

    await act(async () => {
      try {
        await result.current.submitOrder(1, "user123", "token123");
      } catch (error) {
        expect(error).toEqual(mockError);
      }
    });

    expect(createOrder).toHaveBeenCalled();
    expect(result.current.cartItems.length).toBe(1);
  });
});

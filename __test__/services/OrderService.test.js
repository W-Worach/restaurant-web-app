import {
  getOrdersByUserId,
  createOrder,
  changeStatusToReadyToPay,
} from "@/services/OrderService";
import config from "@/services/_config";

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("OrderService", () => {
  const token = "fake-token";
  const userId = "user123";
  const orderId = "order123";

  describe("getOrdersByUserId", () => {
    it("should fetch orders by user ID successfully", async () => {
      const mockOrders = [{ id: 1, item: "Pizza" }];
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockOrders),
        statusText: "OK",
      });

      const result = await getOrdersByUserId(userId, token);
      expect(fetch).toHaveBeenCalledWith(
        `${config.apiUrl}/GetAllUserOrders/${userId}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toEqual(mockOrders);
    });

    it("should throw an error if fetching orders fails", async () => {
      fetch.mockResolvedValue({
        ok: false,
        statusText: "Not Found",
      });

      await expect(getOrdersByUserId(userId, token)).rejects.toThrow(
        "Problem with downloading orders. Not Found"
      );
    });
  });

  describe("createOrder", () => {
    const orderData = { item: "Burger", quantity: 2 };

    it("should create an order successfully and return JSON", async () => {
      const mockResponse = { id: 1, status: "Created" };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
        headers: {
          get: () => "application/json",
        },
      });

      const result = await createOrder(orderData, token);
      expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/api/Order`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      expect(result).toEqual(mockResponse);
    });

    it("should return response as text if content type is not application/json", async () => {
      const responseText = "Order created";
      fetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(responseText),
        headers: {
          get: () => "text/plain",
        },
      });

      const result = await createOrder(orderData, token);
      expect(result).toEqual(responseText);
    });

    it("should throw an error if order creation fails", async () => {
      fetch.mockResolvedValue({
        ok: false,
        statusText: "Internal Server Error",
      });

      await expect(createOrder(orderData, token)).rejects.toThrow(
        "Problem with order creation. Internal Server Error"
      );
    });
  });

  describe("changeStatusToReadyToPay", () => {
    it("should update the order status to ready to pay successfully", async () => {
      const responseText = '{"status":"Ready to Pay"}';
      fetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(responseText),
      });

      const result = await changeStatusToReadyToPay(orderId, token);
      expect(fetch).toHaveBeenCalledWith(
        `${config.apiUrl}/ChangeStatus_ReadyToPay/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      expect(result).toEqual({ status: "Ready to Pay" });
    });

    it("should throw an error when there's an issue parsing the response", async () => {
      const invalidJSONText = "Invalid JSON response";
      fetch.mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(invalidJSONText),
      });

      await expect(changeStatusToReadyToPay(orderId, token)).rejects.toThrow(
        /Error parsing response: Unexpected token/
      );
    });

    it("should throw an error if updating order status fails", async () => {
      fetch.mockResolvedValue({
        ok: false,
        statusText: "Forbidden",
      });

      await expect(changeStatusToReadyToPay(orderId, token)).rejects.toThrow(
        "Problem with updating order status. Forbidden"
      );
    });
  });
});

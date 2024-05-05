import config from "./_config";

const getOrdersByUserId = async (userId, token) => {
  const response = await fetch(config.apiUrl + "/GetAllUserOrders/" + userId, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Problem with downloading orders. " + response.statusText);
  }
  return response.json();
};

const createOrder = async (orderData, token) => {
  const response = await fetch(config.apiUrl + "/api/Order", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Problem with order creation. " + response.statusText);
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    return response.text();
  }
};

const changeStatusToReadyToPay = async (orderId, token) => {
  const response = await fetch(
    config.apiUrl + "/ChangeStatus_ReadyToPay/" + orderId,
    {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(
      "Problem with updating order status. " + response.statusText
    );
  }
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (error) {
    throw new Error("Error parsing response: " + error.message);
  }
};

export { getOrdersByUserId, createOrder, changeStatusToReadyToPay };

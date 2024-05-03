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
    throw new Error("Problem z pobieraniem zamówień. " + response.statusText);
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
    throw new Error("Problem z tworzeniem zamówienia. " + response.statusText);
  }
  return response.json();
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
    throw new Error("Problem z tworzeniem zamówienia. " + response.statusText);
  }
  return response.json();
};

export { getOrdersByUserId, createOrder, changeStatusToReadyToPay };

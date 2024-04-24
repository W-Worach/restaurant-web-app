import config from "./_config";

const getOrdersByUserId = async (userId) => {
  const response = await fetch(config.apiUrl + `/GetAllUserOrders/` + userId);
  if (!response.ok) {
    throw new Error("Problem z pobieraniem zamówień");
  }
  return response.json();
};

export { getOrdersByUserId };

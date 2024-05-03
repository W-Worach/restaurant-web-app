import config from "./_config";

const getAllReservations = async (token) => {
  const response = await fetch(config.apiUrl + "/GetReservations-MobileWeb", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Problem z pobieraniem rezerwacji. " + response.statusText);
  }
  return response.json();
};

export { getAllReservations };

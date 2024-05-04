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

const createReservation = async (reservationData, token) => {
  try {
    const response = await fetch(config.apiUrl + "/api/reservation", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.text();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUserReservations = async (token, userId) => {
  const response = await fetch(
    config.apiUrl + "/GetAllUserReservations/" + userId,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Problem z pobieraniem rezerwacji. " + response.statusText);
  }
  return response.json();
};

const deleteUserReservation = async (token, reservationId) => {
  const response = await fetch(
    config.apiUrl + "/ReservationDelete-User/" + reservationId,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Problem z usuwaniem rezerwacji. " + response.statusText);
  }

  try {
    const data = await response.text();
    return data ? JSON.parse(data) : {};
  } catch (error) {
    throw new Error("Error parsing response: " + error.message);
  }
};

export {
  getAllReservations,
  createReservation,
  getAllUserReservations,
  deleteUserReservation,
};

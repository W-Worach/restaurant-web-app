import config from "./_config";

const getMenuItems = async () => {
  const response = await fetch(config.apiUrl + "/api/Dish");
  if (!response.ok) {
    throw new Error("Problem z pobieraniem menu. " + response.statusText);
  }
  return response.json();
};

export { getMenuItems };

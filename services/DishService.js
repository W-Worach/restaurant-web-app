import config from "./_config";

const getMenuItems = async () => {
  const response = await fetch(config.apiUrl + "/api/Dish");
  if (!response.ok) {
    throw new Error("Problem with downloading menus. " + response.statusText);
  }
  return response.json();
};

export { getMenuItems };

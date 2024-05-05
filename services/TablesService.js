import config from "./_config";

const getTables = async () => {
  const response = await fetch(config.apiUrl + "/api/Table", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Table downloading problem. " + response.statusText);
  }
  return response.json();
};

export { getTables };

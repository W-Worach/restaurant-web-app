import config from "./_config";

const login = async (username, password) => {
  try {
    const url = config.apiUrl + "/login-user";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const register = async (username, email, password) => {
  try {
    const url = config.apiUrl + "/register-user";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { login, register };

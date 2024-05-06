import config from "./_config";

const changeUserPassword = async (userData, token) => {
  const response = await fetch(config.apiUrl + "/Change-User-Password", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userData.userId,
      password: userData.password,
      newPassword: userData.newPassword,
    }),
  });

  if (!response.ok) {
    throw new Error("Problem with changing password. " + response.statusText);
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  } else {
    return response.text();
  }
};

export { changeUserPassword };

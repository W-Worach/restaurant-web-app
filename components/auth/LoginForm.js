import React, { useState } from "react";
import { login } from "@/services/AuthService";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (username.length === 0 || password.length === 0) {
      setError("Username and password required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await login(username, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      window.location.href = "/";
    } catch (error) {
      setError("Failed login. Please check your details and try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        aria-label="Login form"
      >
        <div>
          <label htmlFor="username" className="block mb-1">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value.replace(/(<([^>]+)>)/gi, ""))
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value.replace(/(<([^>]+)>)/gi, ""))
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
            aria-required="true"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md transition duration-300 ${loading ? "bg-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

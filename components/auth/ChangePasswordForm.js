import React, { useState } from "react";

const ChangeUserPasswordForm = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (setterFunction) => (e) => {
    if (error) setError('');
    setterFunction(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const strongPassword = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!strongPassword.test(newPassword)) {
      setError(
        "The password must contain small and capital letters, numbers and special characters."
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    onSubmit({
      password,
      newPassword,
      confirmNewPassword,
      setMessage,
      setError,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div>
        <label htmlFor="password" className="block mb-2">
          Current Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 w-full"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="newPassword" className="block mb-2">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={handleInputChange(setNewPassword)}
          className="px-4 py-2 w-full"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="confirmNewPassword" className="block mb-2">
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={handleInputChange(setConfirmNewPassword)}
          className="px-4 py-2 w-full"
          required
        />
      </div>
      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        type="submit"
        aria-label="Change Password"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangeUserPasswordForm;

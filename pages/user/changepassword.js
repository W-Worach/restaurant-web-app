import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { changeUserPassword } from "@/services/UserService";
import ChangeUserPasswordForm from "@/components/auth/ChangePasswordForm";

const SettingsPage = () => {
  const { token, userId } = useContext(AuthContext);
  
  const handleSubmit = async ({
    password,
    newPassword,
    setMessage,
    setError,
  }) => {
    try {
      const response = await changeUserPassword(
        {
          userId,
          password,
          newPassword,
        },
        token
      );
      setMessage("Password successfully changed.");
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">User Settings</h1>
      <ChangeUserPasswordForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SettingsPage;

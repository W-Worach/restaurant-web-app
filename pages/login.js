import React from "react";
import Link from "next/link";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="container mx-auto">
      <LoginForm />
      <div className="mt-4 text-center">
        Nie masz jeszcze konta?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Zarejestruj się tutaj
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

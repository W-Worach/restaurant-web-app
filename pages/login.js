import React from "react";
import Link from "next/link";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="container mx-auto">
      <LoginForm />
      <div className="mt-4 text-center">
        You do not have an account yet?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

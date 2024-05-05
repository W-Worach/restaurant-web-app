import React from "react";
import Link from "next/link";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="container mx-auto">
      <RegisterForm />
      <div className="mt-4 text-center">
        You have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in here
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;

import React from "react";
import Link from "next/link";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="container mx-auto">
      <RegisterForm />
      <div className="mt-4 text-center">
        Masz konto?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Zaloguj się tutaj
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;

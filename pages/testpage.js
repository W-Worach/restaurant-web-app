import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext"; // Zakładając, że AuthContext jest zdefiniowany w pliku context/AuthContext.js

const TestPage = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  /*
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);
  */

  const toggleLoggedInState = () => {
    if (isLoggedIn) {
      // Log out logic
      localStorage.removeItem("token"); // Może być przeniesione do kontekstu
    } else {
      // Log in logic
      localStorage.setItem("token", "fakeToken"); // Może być przeniesione do kontekstu
    }
    router.reload();
  };

  return (
    <div>
      <h1>Test Page</h1>
      <p>User is {isLoggedIn ? "logged in" : "not logged in"}.</p>
      <button onClick={toggleLoggedInState}>
        {isLoggedIn ? "Log out" : "Log in"}
      </button>
    </div>
  );
};

export default TestPage;

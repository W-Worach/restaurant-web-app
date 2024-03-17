import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter z next/router
import { login } from '../services/authService'; // Upewnij się, że ścieżka jest poprawna

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Użyj hooka useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      console.log('Zalogowano pomyślnie:', response);

      // Zakładając, że token znajduje się w odpowiedzi jako response.token
      localStorage.setItem('token', response.token); // Zapisz token w localStorage
      router.push('/'); // Przekierowanie na stronę główną
    } catch (error) {
      console.error('Błąd podczas logowania:', error);
      // Obsługa błędów (np. wyświetlenie komunikatu)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
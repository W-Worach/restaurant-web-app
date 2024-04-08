import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '../../services/authService';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Wszystkie pola są wymagane.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Hasła nie są identyczne.');
      return false;
    }
    /*
    if (password.length < 8) {
      setError('Hasło musi mieć co najmniej 8 znaków.');
      return false;
    }
    const strongPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    if (!strongPassword.test(password)) {
      setError('Hasło musi zawierać małe i duże litery, cyfry oraz znaki specjalne.');
      return false;
    }
    */
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await register(username, email, password);
      localStorage.setItem('token', response.token);
      console.log('Rejestracja pomyślna:', response);
      router.push('/');
    } catch (error) {
      console.error('Błąd podczas rejestracji:', error);
      setError('Rejestracja nieudana. Spróbuj ponownie.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Rejestracja</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formularz rejestracji">
        <div>
          <label htmlFor="username" className="block mb-1">Nazwa użytkownika:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/(<([^>]+)>)/gi, ""))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.replace(/(<([^>]+)>)/gi, ""))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Hasło:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.replace(/(<([^>]+)>)/gi, ""))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">Potwierdź hasło:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value.replace(/(<([^>]+)>)/gi, ""))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            required
            aria-required="true"
          />
        </div>
        <button type="submit" disabled={loading} className={`w-full py-2 rounded-md transition duration-300 ${loading ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
            {loading ? 'Rejestrowanie...' : 'Zarejestruj się'}
          </button>
        </form>
      </div>
    );
  };
  
  export default RegisterForm;
  
import config from "./_config";

const login = async (username, password) => {
    try {
      const url = config.apiUrl + '/api/auth/login';
  
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Problem z logowaniem. Sprawdź swoje dane i spróbuj ponownie.');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Błąd logowania:', error);
      throw error;
    }
  };
  
const register = async (email, password) => {
    try {
      const url = config.apiUrl + '/api/auth/register';
  
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Problem z rejestracją. Sprawdź swoje dane i spróbuj ponownie.');
      }

      return await response.json();
    } catch (error) {
      console.error('Błąd rejestracji:', error);
      throw error;
    }
  };
  
  export { login, register };
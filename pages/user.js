import React from 'react';

const UserInfo = () => {
  // Przykładowe dane użytkownika
  const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: 30,
    city: 'New York',
    country: 'USA'
  };

  return (
    <div className="flex items-start justify-center h-screen">
      <div className="w-4/5 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4s">
        <h2 className="text-xl font-bold mb-4">Informacje o użytkowniku</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Imię:</label>
          <p>{userData.firstName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nazwisko:</label>
          <p>{userData.lastName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <p>{userData.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Wiek:</label>
          <p>{userData.age}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Miasto:</label>
          <p>{userData.city}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Kraj:</label>
          <p>{userData.country}</p>
        </div>
      </div>
    </div>
  );
};

const UserPage = () => {
  return (
    <div className="bg-gray-200">
      <UserInfo />
    </div>
  );
};

export default UserPage;

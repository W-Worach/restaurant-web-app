import React from 'react';

const DishItem = ({ item }) => {
  return (
    <li className="bg-white rounded-lg shadow-md p-4">
      <div className="font-bold">{item.name}</div>
      <div className="text-gray-600">{item.description}</div>
      <div className="text-lg font-bold mt-2">{item.price} zł</div>
      {!item.availability && (
        <div className="text-red-500 mt-2">Niedostępne</div>
      )}
    </li>
  );
};

export default DishItem;
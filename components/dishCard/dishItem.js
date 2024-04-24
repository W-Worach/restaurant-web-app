import React from "react";
import Image from "next/image";

const DishItem = ({ item, addToCart }) => {
  return (
    <li className="max-w-md bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out p-6 m-2 mx-auto flex flex-col items-center text-center">
      <Image
        src="/placeholder200x200.png"
        alt={item.name}
        width={200}
        height={200}
        className="rounded-t-lg"
      />
      <div className="font-bold text-lg text-blue-600 mt-4">{item.name}</div>
      <div className="text-gray-600 mt-1">{item.description}</div>
      <div className="text-lg font-bold mt-3 text-green-600">
        {item.price} zł
      </div>
      {!item.availability && (
        <div className="text-red-500 mt-2 font-medium">
          Currently Unavailable
        </div>
      )}
      {item.availability && (
        <button
          onClick={() => addToCart(item)}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add to Cart
        </button>
      )}
    </li>
  );
};

export default DishItem;

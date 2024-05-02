import React from "react";
import Image from "next/image";

const DishItem = ({ item, addToCart, showAddToCart }) => {
  return (
    <li
      className="w-64 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out p-6 m-2 mx-auto flex flex-col items-center text-center"
      style={{ width: "250px" }}
    >
      <Image
        src="/placeholder200x200.png"
        alt={item.name}
        width={200}
        height={200}
        className="rounded-t-lg"
      />
      <div className="font-bold text-lg text-blue-600 mt-4">{item.name}</div>
      <div
        className="break-words w-full text-gray-600 mt-1"
        style={{ minHeight: "4em" }}
      >
        {item.description}
      </div>
      <div className="text-lg font-bold mt-3 text-green-600">
        {item.price} zł
      </div>
      {!item.availability && (
        <div className="text-red-500 mt-2 font-medium">
          Currently Unavailable
        </div>
      )}
      {item.availability && showAddToCart && (
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

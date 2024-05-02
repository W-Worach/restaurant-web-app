import React from "react";

const Cart = ({ items, removeFromCart, updateQuantity, submitOrder }) => {
  const getTotalSum = () => {
    return items.reduce(
      (sum, { item, quantity }) => sum + item.price * quantity,
      0
    );
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-4 m-2">
      <h2 className="text-xl font-bold mb-4">Koszyk</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((cartItem, index) => (
            <li
              key={index}
              className="mb-4 p-2 flex justify-between items-center border-b"
            >
              <div className="flex items-center">
                <input
                  type="number"
                  value={cartItem.quantity}
                  onChange={(e) =>
                    updateQuantity(cartItem.item, parseInt(e.target.value))
                  }
                  className="form-input mx-2 text-center w-10"
                  min="1"
                />
                <span className="mr-2 font-bold">{cartItem.item.name}</span>
                <span className="text-sm text-gray-600">
                  Cena: {cartItem.item.price * cartItem.quantity} zł
                </span>
              </div>
              <button
                onClick={() => removeFromCart(cartItem.item)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Usuń
              </button>
            </li>
          ))}
          <div className="flex justify-between items-center mt-4">
            <div className="text-lg font-bold">
              Łączna suma: {getTotalSum()} zł
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={submitOrder}
              disabled={items.length === 0}
            >
              Złóż zamówienie
            </button>
          </div>
        </ul>
      ) : (
        <div className="text-center text-xl">Twój koszyk jest pusty</div>
      )}
    </div>
  );
};

export default Cart;

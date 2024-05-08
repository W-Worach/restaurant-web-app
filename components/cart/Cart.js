import React from "react";

const Cart = ({
  items,
  removeFromCart,
  updateQuantity,
  submitOrder,
  orderStatus,
  setOrderStatus,
}) => {
  const getTotalSum = () => {
    return items.reduce(
      (sum, { item, quantity }) => sum + item.price * quantity,
      0
    );
  };

  const handleChangeQuantity = (item, quantity) => {
    updateQuantity(item, parseInt(quantity));
    if (orderStatus) {
      setOrderStatus("");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-4 m-2">
      <label htmlFor="Cart" className="block text-lg font-medium text-gray-700 text-left">
        Cart:
      </label>
      {orderStatus && items.length === 0 && (
        <div className="p-3 mb-4 text-center text-green-800 bg-green-200 rounded">
          {orderStatus}
        </div>
      )}
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
                    handleChangeQuantity(cartItem.item, e.target.value)
                  }
                  className="form-input mx-2 text-center w-10"
                  min="1"
                />
                <span className="mr-2 font-bold">{cartItem.item.name}</span>
                <span className="text-sm text-gray-600">
                  Price: {cartItem.item.price * cartItem.quantity} zł
                </span>
              </div>
              <button
                onClick={() => removeFromCart(cartItem.item)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
          <div className="flex justify-between items-center mt-4">
            <div className="text-lg font-bold">
              Total: {getTotalSum()} zł
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={submitOrder}
              disabled={items.length === 0}
            >
              Place your order
            </button>
          </div>
        </ul>
      ) : (
        !orderStatus && (
          <div className="text-center text-xl">Your Cart is Empty</div>
        )
      )}
    </div>
  );
};

export default Cart;

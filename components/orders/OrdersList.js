import React from "react";

const OrdersList = ({ orders, onStatusChange }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(amount);
  };

  const getStatusText = (statusNumber) => {
    switch (statusNumber) {
      case 1:
        return "Ready";
      case 2:
        return "Working";
      case 3:
        return "Ready To Pay";
      case 4:
        return "Paid";
      default:
        return "Unknown status";
    }
  };

  const statusStyles = {
    1: "bg-green-500",
    2: "bg-yellow-500",
    3: "bg-orange-500",
    4: "bg-blue-500",
  };

  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="mb-4 p-4 border border-gray-200 rounded-lg shadow-lg"
          >
            <h3 className="font-bold text-lg">Order number: {order.id}</h3>
            <p
              className={`badge ${statusStyles[order.status]} text-white px-2 py-1 rounded-full`}
            >
              Status: {getStatusText(order.status)}
            </p>
            <p className="mt-1 ml-2">Cost: {formatCurrency(order.price)}</p>
            <p className="mt-1 ml-2">
              Table number: {order.tableModel.id} (Number of seats:{" "}
              {order.tableModel.numberOfSeats})
            </p>
            <div className="mt-2">
              <h4 className="font-bold">Food ordered:</h4>
              {order.dishModels.map((dish) => (
                <p key={dish.id} className="ml-2">
                  {dish.name} - {formatCurrency(dish.price)}
                </p>
              ))}
            </div>
            {order.status === 1 && (
              <button
                className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => onStatusChange(order.id, 3)}
              >
                Mark as Ready for Payment
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-lg text-gray-600">No active orders.</p>
      )}
    </div>
  );
};

export default OrdersList;

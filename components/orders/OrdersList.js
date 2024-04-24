import React from "react";

const OrdersList = ({ orders }) => {
  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id}>
            <h3>{order.name}</h3>
            <p>Status: {order.status}</p>
            <p>Kwota: {order.amount}</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersList;

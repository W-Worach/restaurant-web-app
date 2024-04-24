import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getOrdersByUserId } from "../services/OrderService";
import OrdersList from "../components/OrdersList";

const OrdersPage = () => {
  const { userId } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getOrdersByUserId(userId)
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Your Orders</h1>
      <OrdersList orders={orders} />
    </div>
  );
};

export default OrdersPage;

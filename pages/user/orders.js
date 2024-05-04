import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getOrdersByUserId } from "@/services/OrderService";
import OrdersList from "@/components/orders/OrdersList";

const OrdersPage = () => {
  const { userId, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (userId && token) {
      setLoading(true);
      getOrdersByUserId(userId, token)
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [userId, token]);

  const filteredOrders = () => {
    switch (filter) {
      case 'active':
        return orders.filter(order => [1, 2, 3].includes(order.status));
      case 'completed':
        return orders.filter(order => order.status === 4);
      case 'all':
      default:
        return orders;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-blue-500">Ładowanie...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl bg-gray-50">
      <h1 className="text-2xl font-bold text-center mb-6">Twoje zamówienia</h1>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`py-2 px-10 font-bold rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'} w-40`}
        >
          Wszystkie
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`py-2 px-10 font-bold rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'} w-40`}
        >
          Aktywne
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`py-2 px-10 font-bold rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'} w-40`}
        >
          Zakończone
        </button>
      </div>
      <OrdersList orders={filteredOrders()} />
    </div>
  );
};

export default OrdersPage;

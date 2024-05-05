import { useState } from "react";
import { createOrder } from "@/services/OrderService";

const useCartManager = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  const addToCart = (item) => {
    setCartItems((currentItems) => {
      const itemIndex = currentItems.findIndex(
        (cartItem) => cartItem.item.id === item.id
      );
      if (itemIndex > -1) {
        const newItems = [...currentItems];
        newItems[itemIndex].quantity += 1;
        return newItems;
      } else {
        return [...currentItems, { item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems((currentItems) =>
      currentItems.filter((cartItem) => cartItem.item.id !== itemToRemove.id)
    );
  };

  const updateQuantity = (item, quantity) => {
    setCartItems((currentItems) => {
      return currentItems.map((cartItem) => {
        if (cartItem.item.id === item.id) {
          return { ...cartItem, quantity: quantity >= 1 ? quantity : 1 };
        }
        return cartItem;
      });
    });
  };

  const submitOrder = async (tableModelId, identityUserId, token) => {
    const dishModelsId = cartItems.reduce((acc, item) => {
      for (let i = 0; i < item.quantity; i++) {
        acc.push(item.item.id);
      }
      return acc;
    }, []);

    const orderData = {
      status: 1,
      tableModelId,
      dishModelsId,
      identityUserId,
    };

    try {
      const result = await createOrder(orderData, token);
      console.log("Order submitted successfully:", result);
      setCartItems([]);
      setOrderStatus("Zamówienie zostało złożone poprawnie!");
      return result;
    } catch (error) {
      console.error("Error submitting order:", error);
      throw error;
    }
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    submitOrder,
    orderStatus,
    setOrderStatus,
  };
};

export default useCartManager;

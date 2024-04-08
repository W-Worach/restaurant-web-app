import React, { useState, useEffect } from 'react';
import { getMenuItems } from '../services/DishService';
import DishList from '../components/dishCard/DishList';
import Cart from '../components/cart/Cart';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error('Błąd podczas pobierania menu:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const addToCart = (item) => {
    setCartItems(currentItems => {
      const itemIndex = currentItems.findIndex(cartItem => cartItem.item.id === item.id);
      if (itemIndex > -1) {
        const newItems = [...currentItems];
        newItems[itemIndex].quantity += 1;
        return newItems;
      } else {
        return [...currentItems, { item, quantity: 1 }];
      }
    });
  };;

  const removeFromCart = (itemToRemove) => {
    setCartItems(currentItems => currentItems.filter(cartItem => cartItem.item.id !== itemToRemove.id));
  };  

  const updateQuantity = (item, quantity) => {
    setCartItems(currentItems => {
      return currentItems.map(cartItem => {
        if (cartItem.item.id === item.id) {
          return { ...cartItem, quantity: quantity >= 1 ? quantity : 1 };
        }
        return cartItem;
      });
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className="flex-1">
        <DishList items={menuItems} addToCart={addToCart} />
      </div>
      <div className="w-1/3">
        <Cart items={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      </div>
    </div>
  );
};

export default MenuPage;
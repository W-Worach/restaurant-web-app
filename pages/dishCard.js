import React, { useState, useEffect } from 'react';
import { getMenuItems } from '../services/dishService';
import DishList from '../components/dishCard/dishList';

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
  
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
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Menu Posiłków</h1>
        <DishList items={menuItems} />
      </div>
    );
  };
  
  export default MenuPage;
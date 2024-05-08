import React, { useState, useEffect, useContext } from "react";
import { getMenuItems } from "@/services/DishService";
import { getTables } from "@/services/TablesService";
import DishList from "@/components/dishCard/DishList";
import Cart from "@/components/cart/Cart";
import useCartManager from "@/hooks/useCartManager";
import { AuthContext } from "@/context/AuthContext";
import { TableSelectorWithAvailability } from "@/components/tables/TableSelector";
import { TableSelectorWithModalWithAvailability } from "@/components/tables/TableSelectorWithModal";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const { isLoggedIn, userId, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuItemsResponse, tablesResponse] = await Promise.all([
          getMenuItems(),
          getTables(),
        ]);
        setMenuItems(menuItemsResponse);
        setTables(tablesResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    submitOrder,
    orderStatus,
    setOrderStatus,
  } = useCartManager();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
      <div className="flex-1 mb-8 md:mb-0 md:mr-8">
        <DishList
          items={menuItems}
          addToCart={addToCart}
          showAddToCart={isLoggedIn}
        />
      </div>
      <div className="w-full lg:w-1/3">
        {isLoggedIn ? (
          <>
            <div className="m-2 mb-4 shadow-lg p-4 rounded-lg bg-white">
              <TableSelectorWithAvailability
                tables={tables}
                selectedTableId={selectedTableId}
                onTableSelect={setSelectedTableId}
              />
              <TableSelectorWithModalWithAvailability
                tables={tables}
                selectedTableId={selectedTableId}
                onTableSelect={setSelectedTableId}
              />
            </div>
            <Cart
              items={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              submitOrder={() => {
                if (!selectedTableId) {
                  alert("Please select a table before placing an order!");
                } else {
                  submitOrder(selectedTableId, userId, token, setOrderStatus);
                }
              }}
              orderStatus={orderStatus}
              setOrderStatus={setOrderStatus}
            />
          </>
        ) : (
          <div className="text-lg text-center font-semibold my-20">
            Log in to order food.
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;

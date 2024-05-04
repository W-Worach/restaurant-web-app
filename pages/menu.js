import React, { useState, useEffect, useContext } from "react";
import { getMenuItems } from "@/services/DishService";
import { getTables } from "@/services/TablesService";
import DishList from "@/components/dishCard/DishList";
import Cart from "@/components/cart/Cart";
import CartManager from "hooks/useCartManager";
import { AuthContext } from "@/context/AuthContext";
import TableSelector from "@/components/tables/TableSelectorWithAvailability";

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
  }, [userId, token]);

  return (
    <CartManager>
      {({
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        submitOrder,
      }) => (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
          <div className="flex-1 mb-8 md:mb-0 md:mr-8">
            <DishList
              items={menuItems}
              addToCart={addToCart}
              showAddToCart={isLoggedIn}
            />
          </div>
          <div className="w-full md:w-1/3">
            {isLoggedIn ? (
              <>
                <div className="m-2 mb-4 shadow-lg p-4 rounded-lg bg-white">
                  <h2 className="text-lg font-semibold mb-2">Wybierz Stół</h2>
                  <TableSelector
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
                      alert("Wybierz stolik przed zamówieniem!");
                    } else {
                      submitOrder(selectedTableId, userId, token);
                    }
                  }}
                />
              </>
            ) : (
              <div className="text-lg text-center font-semibold my-20">
                Zaloguj się, żeby zamówić jedzenie.
              </div>
            )}
          </div>
        </div>
      )}
    </CartManager>
  );
};

export default MenuPage;

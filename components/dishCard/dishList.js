import React from "react";
import DishItem from "./DishItem";

const DishList = ({ items, addToCart, showAddToCart }) => {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((item) => (
        <DishItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          showAddToCart={showAddToCart}
        />
      ))}
    </ul>
  );
};

export default DishList;

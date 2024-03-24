import React from 'react';
import DishItem from './dishItem';

const DishList = ({ items }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <DishItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default DishList;
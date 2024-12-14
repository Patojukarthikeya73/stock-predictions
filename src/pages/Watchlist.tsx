import React from 'react';
import { MainLayout } from '../layouts/MainLayout';

const Watchlist: React.FC = () => {
  const items = [
    { id: 1, name: 'Stock A', price: '$150' },
    { id: 2, name: 'Stock B', price: '$200' },
    { id: 3, name: 'Stock C', price: '$250' },
  ];

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
      <ul className="list-disc ml-5">
        {items.map((item) => (
          <li key={item.id} className="text-lg mb-2">
            {item.name} - <span className="text-gray-500">{item.price}</span>
          </li>
        ))}
      </ul>
    </MainLayout>
  );
};

export default Watchlist;

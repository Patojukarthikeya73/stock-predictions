import React from 'react';
import { MainLayout } from '../layouts/MainLayout';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-4">Welcome to Your App</h1>
      <p className="text-lg">
        This is the homepage. Explore the features of the app and get started.
      </p>
    </MainLayout>
  );
};

export default Home;

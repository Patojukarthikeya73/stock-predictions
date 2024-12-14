import React from 'react';
import { AuthLayout } from '../layouts/AuthLayout';

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    console.log('Logged in');
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="Enter your email"
          required
        />
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          placeholder="Enter your password"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;

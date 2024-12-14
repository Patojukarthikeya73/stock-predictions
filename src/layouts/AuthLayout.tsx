import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * AuthLayout: A layout component for authentication pages.
 * Includes a centered container with optional branding or design elements.
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-700">Your App</h1>
          <p className="text-sm text-gray-500">Welcome back! Please log in to your account.</p>
        </div>
        {children}
      </div>
    </div>
  );
};

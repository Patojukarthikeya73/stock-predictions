import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout: A layout component for the main application pages.
 * Includes a navigation bar and a content area.
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Your App</h1>
          <nav>
            <a href="/" className="text-white hover:underline mx-2">
              Home
            </a>
            <a href="/profile" className="text-white hover:underline mx-2">
              Profile
            </a>
            <a href="/logout" className="text-white hover:underline mx-2">
              Logout
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Your App. All rights reserved.
      </footer>
    </div>
  );
};

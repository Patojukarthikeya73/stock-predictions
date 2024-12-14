import React from 'react';
import useAuth from './useAuth';

export const Dashboard = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login('email@example.com', 'password')}>Login</button>
      )}
    </div>
  );
};

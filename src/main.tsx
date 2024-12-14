import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import App from './App.tsx';
import './index.css';

// Wrap your application with BrowserRouter
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>  {/* Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);

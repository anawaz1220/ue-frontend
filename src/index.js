import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

// Set base API URL from environment
if (!process.env.REACT_APP_API_URL) {
  // Default to local development if not set
  process.env.REACT_APP_API_URL = 'http://localhost:3000';
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
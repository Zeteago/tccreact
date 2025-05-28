import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home'; // Dashboard principal
import StorePage from './pages/store'; // Página específica da loja

import { AuthProvider, useAuth } from './AuthContext';
import { CartProvider } from './CartContext'; // Importar CartProvider
import './index.css';

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Ou um spinner/indicador de carregamento
  }

  if (user) {
    // Redireciona para home se já estiver autenticado
    return <Navigate to="/" replace />;
  }

  return children;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route 
              path="/" 
              element={<PublicRoute><Home /></PublicRoute>} // Dashboard principal
            />
            <Route 
              path="/store/:storeId" // Rota para visualizar uma loja específica
              element={<PublicRoute><StorePage /></PublicRoute>} 
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

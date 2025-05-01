import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Store from './pages/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/store" element={<Home />} />
        <Route path="/" element={<Store />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

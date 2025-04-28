import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from './pages/home'
import Store from './pages/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)

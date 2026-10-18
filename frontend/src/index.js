import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { UsuarioProvider } from "./context/UsuarioContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <UsuarioProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UsuarioProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

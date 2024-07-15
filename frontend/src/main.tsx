import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { Login } from "./App";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Login />
    </AuthProvider>
  </React.StrictMode>
);

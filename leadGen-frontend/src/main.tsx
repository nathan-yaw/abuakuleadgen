import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Make sure this imports your Tailwind CSS
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login"; // We'll create this next
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthProvider>
        <Register />
      </AuthProvider>
    ),
  },
  {
    path: "/forgotten-details",
    element: (
      <AuthProvider>
        <Reset />
      </AuthProvider>
    ),
  },
  {
    path: "/app",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

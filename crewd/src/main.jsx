import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Authprovider from "./providers/Authprovider";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import HRDashboard from "./components/HRDashboard/HRDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";
import Unauthorized from "./components/Unauthorized/Unauthorized";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard/hr",
        element: (
          <PrivateRoute allowedRoles={["HR"]}>
            <HRDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/employee",
        element: (
          <PrivateRoute allowedRoles={["Employee"]}>
            <EmployeeDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  </StrictMode>
);

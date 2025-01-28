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

import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard";

import EmployeeList from "./components/Employee-List/EmployeeList";
import Worksheet from "./components/WorkSheet/WorkSheet";
import UsersList from "./components/UserList/UserList";
import Payroll from "./components/Payroll/Payroll";

import HrPayment from "./components/HrPayment/HrPayment";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import Progress from "./components/Progress/Progress";
import Contact from "./components/Contact/Contact";
import VisitorMessages from "./components/VisitorMessages/VisitorMessages";
import PaymentHistory from "./components/PaymentHistory/PaymentHistory";


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
        path: "/employee-list",
        element: 
          
           <EmployeeList></EmployeeList>
          
        
      },
      {
        path: "/worksheet",
        element: 
          <Worksheet></Worksheet>
        
      },
      {
        path: "/userList",
        element: <UsersList></UsersList>,
      },
      {
        path: "/payroll",
        element: <Payroll></Payroll>,
      },
      {
        path: "/HRpayment",
        element: <HrPayment></HrPayment>,
      }, {
        path: "/employee/:email",
        element: <EmployeeDetails></EmployeeDetails>,
      },

      {
        path: "/progress",
        element: <Progress></Progress>,
      },

      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/visitor-messages",
        element: <VisitorMessages></VisitorMessages>,
      },
      {
        path:"/payment-history",
        element:<PaymentHistory></PaymentHistory>,
      }
      
     
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

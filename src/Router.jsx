import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/user/Home";
import Profile from "./pages/user/Profile";
import Product from "./pages/user/Product";
import DetailProduct from "./pages/user/DetailProduct";
import CheckoutProduct from "./pages/user/CheckoutProduct";
import HistoryOrder from "./pages/user/HistoryOrder";
import DetailOrder from "./pages/user/DetailOrder";
import Dashboard from "./pages/admin/Dashboard";
import Order from "./pages/admin/Order";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminUser from "./pages/admin/AdminUser";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    // errorElement: "",
  },
  {
    path: "/register",
    element: <Register />,
    // errorElement: "",
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    // errorElement: "",
  },
  {
    path: "/",
    element: <Home />,
    // errorElement: "",
  },
  {
    path: "/profile",
    element: <Profile />,
    // errorElement: "",
  },
  {
    path: "/product",
    element: <Product />,
    // errorElement: "",
  },
  {
    path: "/detail-product/:id",
    element: <DetailProduct />,
    // errorElement: "",
  },
  {
    path: "/checkout-product",
    element: <CheckoutProduct />,
    // errorElement: "",
  },
  {
    path: "/history-order",
    element: <HistoryOrder />,
    // errorElement: "",
  },
  {
    path: "/detail-order/:id",
    element: <DetailOrder />,
    // errorElement: "",
  },
  {
    path: "/dashboard",
    element: <Dashboard path="/dashboard" />,
    // errorElement: "",
  },
  {
    path: "/admin/order",
    element: <Order path="/admin/order" />,
    // errorElement: "",
  },
  {
    path: "/admin/product",
    element: <AdminProduct path="/admin/product" />,
    // errorElement: "",
  },
  {
    path: "/admin/user",
    element: <AdminUser path="/admin/user" />,
    // errorElement: "",
  },
]);

export default router;

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
import PrivateUser from "./components/PrivateUser";
import PrivateAdmin from "./components/PrivateAdmin";
import PrivateAuth from "./components/PrivateAuth";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PrivateAuth>
        <Login />
      </PrivateAuth>
    ),
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
    element: (
      <PrivateUser>
        <Profile />
      </PrivateUser>
    ),
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
    element: (
      <PrivateUser>
        <HistoryOrder />
      </PrivateUser>
    ),
    // errorElement: "",
  },
  {
    path: "/detail-order/:id",
    element: (
      <PrivateUser>
        <DetailOrder />
      </PrivateUser>
    ),
    // errorElement: "",
  },
  {
    path: "/dashboard",
    element: (
      <PrivateAdmin>
        <Dashboard path="/dashboard" />
      </PrivateAdmin>
    ),
    // errorElement: "",
  },
  {
    path: "/admin/order",
    element: (
      <PrivateAdmin>
        <Order path="/admin/order" />
      </PrivateAdmin>
    ),
    // errorElement: "",
  },
  {
    path: "/admin/product",
    element: (
      <PrivateAdmin>
        <AdminProduct path="/admin/product" />
      </PrivateAdmin>
    ),
    // errorElement: "",
  },
  {
    path: "/admin/user",
    element: (
      <PrivateAdmin>
        <AdminUser path="/admin/user" />
      </PrivateAdmin>
    ),
    // errorElement: "",
  },
]);

export default router;

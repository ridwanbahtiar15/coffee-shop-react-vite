import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/user/Home";
import Profile from "./pages/user/Profile";

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/home",
    element: <Home />,
    // errorElement: "",
  },
  {
    path: "/users/profile",
    element: <Profile />,
    // errorElement: "",
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    // errorElement: "",
  },
  {
    path: "/home",
    element: "",
    // errorElement: "",
  },
]);

export default router;

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./Router.jsx";
// import { UserProvider } from "./context/UserContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { Provider as ReduxProvider } from "react-redux";
import reduxStore from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={reduxStore}>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </ReduxProvider>
  </React.StrictMode>
);

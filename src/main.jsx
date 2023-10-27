import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./Router.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { store, persistedStore } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ProductProvider>
          <RouterProvider router={router} />
        </ProductProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);

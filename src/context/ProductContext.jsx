import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const UseProductContext = () => useContext(ProductContext);

// siapkan komponen provider
export const ProductProvider = ({ children }) => {
  const [body, setBody] = useState([]);
  const changeBody = (data) => {
    setBody(data);
  };

  return (
    <ProductContext.Provider value={{ body, changeBody }}>
      {children}
    </ProductContext.Provider>
  );
};

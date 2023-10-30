import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const UseProductContext = () => useContext(ProductContext);

// siapkan komponen provider
// eslint-disable-next-line react/prop-types
export const ProductProvider = ({ children }) => {
  const [body] = useState([]);
  const [wrapBody, setWrapBody] = useState([]);

  const addData = (data) => {
    setWrapBody([...wrapBody, data]);
  };

  const deleteData = (id) => {
    // wrapBody.splice(id, 1);
    // const newData = wrapBody.filter((e) => 0 != id);
    const newData = [];
    for (let i = 0; i < wrapBody.length; i++) {
      if (i != id) {
        newData.push(wrapBody[i]);
      }
    }
    setWrapBody(newData);
  };

  return (
    <ProductContext.Provider value={{ body, wrapBody, addData, deleteData }}>
      {children}
    </ProductContext.Provider>
  );
};

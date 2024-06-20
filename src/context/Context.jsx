import { createContext, useState } from "react";

export const weathercontext = createContext();
export const ContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  return (
    <weathercontext.Provider value={{ setData, data }}>
      {children}
    </weathercontext.Provider>
  );
};

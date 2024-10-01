import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};

export const LoadingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

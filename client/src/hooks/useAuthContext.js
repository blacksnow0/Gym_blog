import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error(
      "useAuthContext can only be used inside the AuthContext provider"
    );
  }
  return context;
};

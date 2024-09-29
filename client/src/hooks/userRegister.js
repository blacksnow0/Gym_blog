import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:4400/api/users/register", {
        email,
        password,
      });
      if (res.status === 200) {
        const { email, token } = res.data;
        localStorage.setItem("user", JSON.stringify({ email, token }));
        dispatch({ state: "LOGIN", payload: { email, token } });
        setLoading(false);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data || "Server error occurred");
      } else if (err.request) {
        setError("No response from the error");
      } else {
        setError("Error occured during registeration");
      }
      setLoading(false);
    }
  };
  return { register, error, loading };
};

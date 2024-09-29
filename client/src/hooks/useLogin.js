import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:4400/api/users/login", {
        email,
        password,
      });

      if (res.status === 200) {
        const { email, token } = res.data;

        localStorage.setItem("user", JSON.stringify({ email, token }));
        dispatch({ type: "LOGIN", payload: { email, token } });
        setLoading(false);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Server error occurred");
      } else if (err.request) {
        setError("No response from the server. Please try again later");
      } else {
        setError("Error while Logging in");
      }
      setLoading(false);
    }
  };
  return { login, error, loading };
};

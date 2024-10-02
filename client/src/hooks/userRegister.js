// import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";
// import axios from "axios";

// export const useRegister = () => {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(null);
//   const { dispatch } = useAuthContext();

//   const register = async (email, password) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.post(
//         "https://gym-blog-3.onrender.com/api/users/register",
//         {
//           email,
//           password,
//         }
//       );
//       if (res.status === 200) {
//         const { email, token } = res.data;
//         localStorage.setItem("user", JSON.stringify({ email, token }));
//         dispatch({ state: "LOGIN", payload: { email, token } });
//         setLoading(false);
//       }
//     } catch (err) {
//       if (err.response) {
//         setError(err.response.data || "Server error occurred");
//       } else if (err.request) {
//         setError("No response from the error");
//       } else {
//         setError("Error occured during registeration");
//       }
//       setLoading(false);
//     }
//   };
//   return { register, error, loading };
// };

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Initialize to false
  const { dispatch } = useAuthContext();

  const register = async (email, password) => {
    setLoading(true);
    setError(null); // Reset error on new request

    try {
      const res = await axios.post(
        "https://gym-blog-3.onrender.com/api/users/register",
        { email, password }
      );

      if (res.status === 200) {
        const { email, token } = res.data;
        localStorage.setItem("user", JSON.stringify({ email, token }));
        dispatch({ type: "LOGIN", payload: { email, token } });
      }
    } catch (err) {
      // More descriptive error handling
      if (err.response) {
        setError(err.response.data.message || "Server error occurred"); // Access message if available
      } else if (err.request) {
        setError("No response from the server. Please try again.");
      } else {
        setError("An error occurred during registration.");
      }
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return { register, error, loading };
};

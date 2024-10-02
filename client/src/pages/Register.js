// import React, { useState } from "react";
// import { useRegister } from "../hooks/userRegister";

// function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { register, error, loading } = useRegister();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await register(email, password);
//   };

//   return (
//     <form className="signup" onSubmit={handleSubmit}>
//       <h3>Register:</h3>
//       <label>Email</label>
//       <input
//         value={email}
//         type="email"
//         placeholder="email"
//         onChange={(e) => setEmail(e.target.value)}
//       ></input>
//       <label>Password:</label>
//       <input
//         value={password}
//         type="password"
//         placeholder="password"
//         onChange={(e) => setPassword(e.target.value)}
//       ></input>

//       <button disabled={loading}>Register</button>
//       {error && <div className="error">{error}</div>}
//     </form>
//   );
// }

// export default Register;
import React, { useState } from "react";
import { useRegister } from "../hooks/userRegister";
import { Oval } from "react-loader-spinner";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { register, error, loading } = useRegister();

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Validate email and password
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."
      );
      return;
    }

    // If validations pass, proceed with registration
    await register(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Register:</h3>
      <label>Email</label>
      <input
        value={email}
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <div className="error">{emailError}</div>}

      <label>Password:</label>
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <div className="error">{passwordError}</div>}

      <button disabled={loading}>
        {loading ? (
          <Oval color="#00BFFF" height={20} width={20} /> // Show spinner while loading
        ) : (
          "Register"
        )}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Register;

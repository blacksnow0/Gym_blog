import React, { useState } from "react";
import { useRegister } from "../hooks/userRegister";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, error, loading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      ></input>
      <label>Password:</label>
      <input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button disabled={loading}>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Register;

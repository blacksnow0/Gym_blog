import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <button disabled={loading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;

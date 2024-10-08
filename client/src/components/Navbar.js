import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import "../styles/Navbar.css";

import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "light",
    });
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h3>I Changed It</h3>
        </Link>
        <nav>
          {user ? ( // Conditional rendering for authenticated users
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log-out</button>
            </div>
          ) : (
            // Conditional rendering for guests
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

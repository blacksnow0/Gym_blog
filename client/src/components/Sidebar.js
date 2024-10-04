import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Gym_Growth</h2>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/user">Dashboard</Link>
        </li>
        <li>
          <Link to="/">Workouts</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

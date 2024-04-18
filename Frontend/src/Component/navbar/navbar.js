import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
function Navbar() {
  return (
    <div className="sidebar">
      {/* <div className="sidebar-header">
        <h3>Dashboard</h3>
      </div> */}
      <ul className="components">
        <li>
          <Link to="/project">Project Management</Link>
        </li>
        <li>
          <Link to="/#">Pulse</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

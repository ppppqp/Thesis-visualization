import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./navbar.css"
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/Topic">
            Topic View
          </NavLink>
          <NavLink className="nav-item nav-link" to="/Relation">
            Relation View
          </NavLink>

        </div>
      </div>
      <div className="header">SJTU Thesis Exploration System</div>
    </nav>
  );
};

export default NavBar;

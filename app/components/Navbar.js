import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div id="navbar" className="row">
      <NavLink to="/" activeClassName="active">
        Home
      </NavLink>
      <NavLink exact to="/robots" activeClassName="active">
        Robots
      </NavLink>
      <NavLink to="/projects" activeClassName="active">
        Projects
      </NavLink>
    </div>
  );
};

export default Navbar;

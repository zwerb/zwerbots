import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div id="navbar" className="row">
      <NavLink to="/" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/robots" activeClassName="active">
        Robots
      </NavLink>
    </div>
  );
};

export default Navbar;

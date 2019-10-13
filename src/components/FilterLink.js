import React from "react";
import { NavLink } from "react-router-dom";
const FilterLink = ({ filter, children }) => (
  // appends either 'active', 'completed', or an empty string to url
  <NavLink
    to={filter === "all" ? "/" : filter}
    activeStyle={{
      textDecoration: "none",
      color: "black"
    }}
  >
    {children}
  </NavLink>
);
export default FilterLink;

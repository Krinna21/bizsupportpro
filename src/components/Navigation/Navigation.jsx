import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/" className="navigation__link" end>Home</NavLink>
      <NavLink to="/tickets" className="navigation__link">My Tickets</NavLink>
      <NavLink to="/subscriptions" className="navigation__link">Subscriptions</NavLink>
      <NavLink to="/about" className="navigation__link">About</NavLink>
    </nav>
  );
}

export default Navigation;

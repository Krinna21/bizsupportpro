import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header({ onLoginClick, onRegisterClick }) {
  return (
    <header className="header">
      <div className="header__logo">
        <NavLink to="/" className="header__brand">BizSupportPro</NavLink>
      </div>
      <nav className="header__nav">
        <button className="header__btn" onClick={onLoginClick} type="button">Login</button>
        <button className="header__btn header__btn--register" onClick={onRegisterClick} type="button">Register</button>
      </nav>
    </header>
  );
}

export default Header;

import React from "react";
import "./Preloader.css";

function Preloader({ message = "Loading..." }) {
  return (
    <div className="preloader">
      <div className="preloader__circle" aria-label="Loading" />
      <p className="preloader__text">{message}</p>
    </div>
  );
}

export default Preloader;

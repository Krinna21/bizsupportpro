import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <span className="footer__copyright">
        &copy; {new Date().getFullYear()} BizSupportPro. All rights reserved.
      </span>
    </footer>
  );
}

export default Footer;

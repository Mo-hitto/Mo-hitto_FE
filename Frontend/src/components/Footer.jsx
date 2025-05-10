import React from "react";
import instaLogo from "../assets/insta-logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>&copy; 2025 Mohitto. All Rights Reserved.</p>
      </div>
      <div className="footer-center">
        <span className="footer-logo">MO:hitto</span>
      </div>
      <div className="footer-right">
        contact us
        <img src={instaLogo} className="insta-logo" />
        ssu_iise
      </div>
    </footer>
  );
};

export default Footer;

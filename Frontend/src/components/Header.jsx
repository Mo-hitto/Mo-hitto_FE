import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} className="header-logo" />

      <div className="header-right">
        <nav className="header-nav">
          <Link to="/consulting" className="nav-item">
            헤어 컨설팅
          </Link>
          <Link to="/simulation" className="nav-item">
            시뮬레이션
          </Link>
        </nav>
        <img src={profile} className="header-profile" />
      </div>
    </div>
  );
};

export default Header;

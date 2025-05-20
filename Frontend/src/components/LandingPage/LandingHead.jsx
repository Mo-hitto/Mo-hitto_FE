import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "../Header.css";
import "./LandingHead.css";
import KakaoLogin from "../Login/KakaoLogin";

const LandingHead = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="header">
      <img src={logo} className="header-logo" />
      <div className="header-right2">
        <button className="login-btn" onClick={() => setModalOpen(true)}>
          로그인
        </button>
      </div>
      {isModalOpen && <KakaoLogin onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default LandingHead;

import React from "react";
import "./KakaoLogin.css";
import kakao from "../../assets/kakao.png";

const KAKAO_LOGIN_URL = "https://iise-mohitto.store/oauth2/kakao";

const KakaoLogin = ({ onClose }) => {
  const handleLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">
          <h2>로그인</h2>
          <button className="kakao-login-btn" onClick={handleLogin}>
            <img src={kakao} className="kakaoLogo" />
            카카오로 3초 만에 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default KakaoLogin;

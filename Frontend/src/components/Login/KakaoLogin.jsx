import React from "react";
import "./KakaoLogin.css";
import loginLogo from "../../assets/loginLogo.png";
import kakao from "../../assets/kakao.png";

const REST_API_KEY = "a3c2fb00ee052dcf258bc6cf78da7fdc";
const REDIRECT_URI = "http://localhost:5173/consulting";

const KakaoLogin = () => {
  const handleLogin = () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="kakao-page">
      <div className="container">
        <div className="left">
          <img src={loginLogo} className="left-logo" alt="logo" />
        </div>

        <div className="right-wrapper">
          <div className="right-card">
            <p className="desc">
              AI 기반 헤어 컨설팅
              <br />
              가장 어울리는 단 하나의 스타일
            </p>
            <button className="kakao-btn" onClick={handleLogin}>
              <img src={kakao} className="kakaoLogo" />
              카카오로 3초 만에 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KakaoLogin;

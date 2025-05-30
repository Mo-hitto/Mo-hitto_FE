import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import Smile from "../assets/Smile.png";
import heart from "../assets/heart.png";
import Home from "../assets/Home.png";
import Logout from "../assets/Logout.png";

import "./Header.css";

const Header = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  // 외부 클릭 시 팝업 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 로그아웃 처리
  const handleLogout = async () => {
    const confirmLogout = window.confirm("정말 로그아웃하시겠어요?");
    if (!confirmLogout) return;

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      console.warn("❌ 토큰 없음 → 로그아웃 생략");
      return;
    }

    try {
      const response = await fetch("http://43.203.208.49:8080/oauth2/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          refreshToken: `${refreshToken}`,
        }),
      });

      if (response.status === 204) {
        console.log("✅ 로그아웃 성공");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/"); // 첫 화면으로 이동
      } else {
        console.error("❌ 로그아웃 실패", await response.text());
      }
    } catch (err) {
      console.error("🚨 로그아웃 요청 에러:", err);
    }
  };

  return (
    <div className="header">
      <Link to="/main" className="nav-item">
        <img src={logo} className="header-logo" />
      </Link>

      <div className="header-right">
        <nav className="header-nav">
          <Link to="/consulting" className="nav-item">
            헤어 컨설팅
          </Link>
          <Link to="/simulation" className="nav-item">
            시뮬레이션
          </Link>
        </nav>

        <div className="header-profile-container" ref={popupRef}>
          <img
            src={profile}
            className="header-profile"
            onClick={() => setShowProfilePopup((prev) => !prev)}
          />
          {showProfilePopup && (
            <div className="profile-popup">
              <div className="profile-info">
                <img src={profile} className="popup-avatar" />
                <div className="popup-text">
                  <div className="popup-name">김민주</div>
                  <div className="popup-email">minju@naver.com</div>
                </div>
              </div>
              <hr />
              <Link to="/Myhome" className="popup-item">
                <img src={Smile} className="popup-icon" />
                나의 계정
              </Link>
              <Link to="/Myhair" className="popup-item">
                <img src={heart} className="popup-icon" />
                저장한 헤어
              </Link>
              <Link to="/Myshop" className="popup-item">
                <img src={Home} className="popup-icon" />
                저장한 미용실
              </Link>
              <hr />
              <button
                className="popup-item logout-button"
                onClick={handleLogout}
              >
                <img src={Logout} className="popup-icon" />
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

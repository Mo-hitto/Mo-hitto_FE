import React, { useState } from "react";
import "./Hero.css";
import KakaoLogin from "../Login/KakaoLogin";

const Hero = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          헤어 고민의 끝,
          <br />
          모히또의 시작
        </h1>
        <p className="hero-subtitle">
          AI가 어울리는 <strong>헤어스타일을 추천</strong>하고
          <br />
          <strong>서울레이션</strong>부터 <strong>미용실 정보</strong>까지
          한번에 제공해요
        </p>
        <div className="hero-buttons">
          <button
            className="hero-btn primary"
            onClick={() => setModalOpen(true)}
          >
            헤어컨설팅
          </button>
          <button
            className="hero-btn secondary"
            onClick={() => setModalOpen(true)}
          >
            시뮬레이션
          </button>
        </div>
      </div>
      {isModalOpen && <KakaoLogin onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Hero;

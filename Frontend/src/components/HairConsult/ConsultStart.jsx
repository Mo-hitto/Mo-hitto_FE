import React from "react";
import { useNavigate } from "react-router-dom";
import "./ConsultStart.css";
import scissors from "../../assets/scissors.png";

const ConsultStart = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/BasicDiagnosis");
  };

  return (
    <div className="consult-container">
      <h2 className="consult-title">| Hair Consulting</h2>
      <div className="consult-card">
        <img src={scissors} alt="MO:hitto logo" className="consult-logo" />
        <div className="consult-text-box">
          <p className="consult-subheading">AI 기반 헤어 컨설팅,</p>
          <h3 className="consult-brand">MO:hitto</h3>
          <p className="consult-description">
            얼굴형을 분석하고, 최적의 헤어스타일을 탐색해보세요!
          </p>
        </div>
        <button className="consult-button" onClick={handleStart}>
          컨설팅 시작
        </button>
      </div>
    </div>
  );
};

export default ConsultStart;

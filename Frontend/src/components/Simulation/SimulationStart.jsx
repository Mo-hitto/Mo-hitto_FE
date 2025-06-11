import React from "react";
import { useNavigate } from "react-router-dom";
import "../HairConsult/ConsultStart.css";
import scissors from "../../assets/scissors.png";

const SimulationStart = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/Simulation2");
  };

  return (
    <div className="consult-container">
      <h2 className="consult-title">| Simulation</h2>
      <div className="consult-card">
        <img src={scissors} alt="MO:hitto logo" className="consult-logo" />
        <div className="consult-text-box">
          <p className="consult-subheading">AI 기반 헤어 시뮬레이션,</p>
          <h3 className="consult-brand">MO:hitto</h3>
          <p className="consult-description">
            내 얼굴에 어울리는 다양한 스타일, 지금 체험해보세요!
          </p>
        </div>
        <button className="consult-button" onClick={handleStart}>
          시뮬레이션 시작
        </button>
      </div>
    </div>
  );
};

export default SimulationStart;

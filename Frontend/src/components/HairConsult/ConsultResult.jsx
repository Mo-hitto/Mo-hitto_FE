import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConsultResult.css";

const ConsultResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  const recommendations = result?.data?.recommendations || [];

  const handleSelect = (item) => {
    localStorage.setItem("selectedStyle", JSON.stringify(item)); // item 전체 저장
    navigate("/HairDetail", { state: { modelImageId: item.modelImageId } });
  };

  return (
    <div className="consult-result-container">
      <h2 className="consult-result-title">
        | Your Top {recommendations.length}
      </h2>
      <p className="consult-result-subtitle">
        👀 마음에 드는 스타일을 선택하세요!
        <br />
        당신의 얼굴과 매칭된 이미지와 스타일 정보를 확인할 수 있어요.
      </p>
      <div className="recommendation-grid">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="recommendation-box"
            onClick={() => handleSelect(item)}
          >
            <div className="recommendation-rank">{index + 1}</div>
            <div className="recommendation-style">{item.style}</div>
            <button className="recommendation-button">▶</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultResult;

import React, { useState } from "react";
import "./DiagnosisB.css";
import { useNavigate } from "react-router-dom";

const DiagnosisB = ({ onNext }) => {
  const [form, setForm] = useState({
    sexId: null,
    hairTypeId: null,
    hairLengthId: null,
    foreheadShapeId: null,
    cheekboneId: null,
    hasbangId: null, // ✅ 앞머리 여부
  });

  const handleSelect = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const requestHeaders = {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      };

      console.log("📦 보낼 데이터:", form);
      console.log("🔐 Authorization 헤더:", requestHeaders.Authorization);

      const response = await fetch(
        "http://43.203.208.49:8080/diagnosis/basic",
        {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const diagnosisId = data.data.diagnosisId;

      console.log("진단 ID:", diagnosisId);

      navigate("/PreferDiagnosis", {
        state: { diagnosisId },
      });
    } catch (err) {
      console.error("제출 실패:", err.message || err);
    }
  };

  const options = {
    sexId: [
      { label: "남성", value: 1 },
      { label: "여성", value: 2 },
    ],
    hairTypeId: [
      { label: "직모", value: 1 },
      { label: "곱슬", value: 2 },
      { label: "반곱슬", value: 3 },
    ],
    hairLengthId: [
      { label: "숏", value: 1 },
      { label: "미디움", value: 2 },
      { label: "롱", value: 3 },
    ],
    foreheadShapeId: [
      { label: "둥근형", value: 1 },
      { label: "M자형", value: 2 },
      { label: "네모형", value: 3 },
    ],
    cheekboneId: [
      { label: "많이 도드라짐", value: 1 },
      { label: "약간 도드라짐", value: 2 },
      { label: "눈에 띄지않음", value: 3 },
    ],
    hasbangId: [
      { label: "있음", value: 1 },
      { label: "없음", value: 2 },
      { label: "모름", value: 3 },
    ],
  };

  const navigate = useNavigate();

  return (
    <div className="consult-container">
      <h2 className="consult-title-2">
        | 최적의 헤어스타일을 찾기 위한 설문을 진행합니다.
      </h2>
      <div className="consult-b-container">
        <div className="consult-b-header">
          <h3 className="consult-b-title">기초 진단</h3>
        </div>
        <div className="consult-b-steps">
          <span className="step active">1</span>
          <span className="step">2</span>
          <span className="step">3</span>
        </div>

        {Object.entries(options).map(([key, choices]) => (
          <div key={key} className="consult-b-section">
            <p className="consult-b-label">
              {key === "sexId"
                ? "성별을 선택하세요."
                : key === "hairTypeId"
                ? "모발 형태를 선택하세요."
                : key === "hairLengthId"
                ? "현재 헤어 기장을 선택하세요."
                : key === "foreheadShapeId"
                ? "이마 모양을 선택하세요."
                : key === "cheekboneId"
                ? "광대 모양을 선택하세요."
                : "현재 앞머리 유무를 선택하세요."}{" "}
              {/* hasbangId */}
            </p>
            <div className="consult-b-options">
              {choices.map(({ label, value }) => (
                <button
                  key={value}
                  className={`consult-b-option-button ${
                    form[key] === value ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(key, value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="consult-b-submit-wrap">
          <button className="consult-b-submit" onClick={handleSubmit}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisB;

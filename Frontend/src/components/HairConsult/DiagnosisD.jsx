import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DiagnosisB.css";
import "./DiagnosisD.css";

const DiagnosisD = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const diagnosisId = location.state?.diagnosisId;

  const [selectedMoods, setSelectedMoods] = useState([]);
  const [difficultyId, setDifficultyId] = useState(null);

  useEffect(() => {
    if (!diagnosisId) {
      alert("진단 ID가 누락되었습니다. 처음부터 다시 시도해주세요.");
      navigate("/");
    }
  }, [diagnosisId, navigate]);

  const moods = [
    { id: 1, label: "세련된" },
    { id: 2, label: "부드러운" },
    { id: 3, label: "깔끔한" },
    { id: 4, label: "귀여운" },
    { id: 5, label: "단정한" },
    { id: 6, label: "우아한" },
    { id: 7, label: "독특한" },
    { id: 8, label: "사랑스러운" },
    { id: 9, label: "고급스러운" },
    { id: 10, label: "차분한" },
    { id: 11, label: "따뜻한" },
    { id: 12, label: "강렬한" },
  ];

  const difficulties = [
    { id: 1, label: "쉬움" },
    { id: 2, label: "보통" },
    { id: 3, label: "어려움" },
  ];

  const toggleMood = (id) => {
    setSelectedMoods((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (selectedMoods.length === 0 || !difficultyId) {
      alert("모든 항목을 선택해주세요.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `http://43.203.208.49:8080/diagnosis/${diagnosisId}/preference`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
          body: JSON.stringify({
            moodIds: selectedMoods,
            difficultyId: difficultyId,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ 선호도 진단 완료:", result);

      // ✅ 다음 페이지로 이동
      navigate("/imageUpload", {
        state: { diagnosisId },
      });
    } catch (err) {
      console.error("선호도 제출 실패:", err.message || err);
    }
  };

  return (
    <div className="consult-container">
      <h2 className="consult-title-2">
        | 최적의 헤어스타일을 찾기 위한 설문을 진행합니다.
      </h2>
      <div className="consult-b-container">
        <div className="consult-b-header">
          <h3 className="consult-b-title">선호도 진단</h3>
        </div>

        <div className="consult-b-steps">
          <span className="step">1</span>
          <span className="step active">2</span>
          <span className="step">3</span>
        </div>

        <div className="consult-b-section">
          <p className="consult-b-label">선호하는 인상을 모두 선택하세요.</p>
          <div className="consult-b-options">
            {moods.map(({ id, label }) => (
              <button
                key={id}
                className={`consult-b-option-button ${
                  selectedMoods.includes(id) ? "selected" : ""
                }`}
                onClick={() => toggleMood(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="consult-b-section">
          <p className="consult-b-label">원하는 손질 난이도를 선택하세요.</p>
          <div className="consult-b-options">
            {difficulties.map(({ id, label }) => (
              <button
                key={id}
                className={`consult-b-option-button ${
                  difficultyId === id ? "selected" : ""
                }`}
                onClick={() => setDifficultyId(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="consult-b-submit-wrap">
          <button className="consult-b-submit" onClick={handleSubmit}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisD;

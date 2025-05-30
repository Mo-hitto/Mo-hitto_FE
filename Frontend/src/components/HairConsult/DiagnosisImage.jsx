import React, { useState } from "react";
import "./DiagnosisB.css";
import "./DiagnosisImage.css";
import { useNavigate } from "react-router-dom";

const DiagnosisImage = ({ onComplete }) => {
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", imageFile);

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch("http://43.203.208.49:8080/image/upload", {
        method: "POST",
        headers: {
          Authorization: `${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ 이미지 업로드 성공:", data);
      if (onComplete) onComplete(); // 결과 페이지 이동 or 완료 처리
    } catch (err) {
      console.error("이미지 업로드 실패:", err.message || err);
    }
  };

  return (
    <div className="consult-container">
      <h2 className="consult-title-2">| 이미지 업로드</h2>
      <div className="consult-b-container">
        <div className="consult-b-header">
          <span className="consult-b-back" onClick={() => navigate(-1)}>
            &lt;
          </span>
          <h3 className="consult-b-title">이미지를 업로드하세요.</h3>
        </div>

        <div className="consult-b-steps">
          <span className="step">1</span>
          <span className="step">2</span>
          <span className="step active">3</span>
        </div>

        <div className="consult-b-section">
          <label className="consult-image-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
            <div className="upload-box">
              {imageFile ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="preview"
                  className="upload-preview"
                />
              ) : (
                <>
                  <img src="/icon/image-placeholder.svg" alt="placeholder" />
                  <span>파일 선택</span>
                </>
              )}
            </div>
          </label>
        </div>

        <div className="consult-b-section">
          <div className="image-tip-box">
            <strong>이런 사진이 좋아요.</strong>
            <ul>
              <li>이마와 턱선, 귀까지 보이는 사진</li>
              <li>정면을 바라보는 셀카 혹은 증명사진</li>
              <li>그림자가 지지 않은 사진</li>
            </ul>
          </div>
        </div>

        <div className="consult-b-submit-wrap">
          <button className="consult-b-submit" onClick={handleSubmit}>
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisImage;

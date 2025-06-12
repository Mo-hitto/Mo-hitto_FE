import React, { useState, useEffect } from "react";
import ImageUpload from "../../assets/imageUpload.png";
import guidePicture from "../../assets/guidePicture.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./DiagnosisImage.css";

const DiagnosisImage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const diagnosisId = location.state?.diagnosisId;

  const [preview, setPreview] = useState(null);
  const [resizedFile, setResizedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!diagnosisId) {
      alert("진단 정보가 누락되었습니다. 처음부터 다시 시작해주세요.");
      navigate("/");
    }
  }, [diagnosisId, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);
      resizeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = (dataUrl) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 512, 512);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            alert("이미지 변환에 실패했습니다.");
            return;
          }
          const jpegFile = new File([blob], "upload.jpg", {
            type: "image/jpeg",
          });
          setResizedFile(jpegFile);
        },
        "image/jpeg",
        0.9
      );
    };
    img.onerror = () => alert("이미지 로드에 실패했습니다.");
    img.src = dataUrl;
  };

  const handleSubmit = async () => {
    if (!resizedFile || !diagnosisId) {
      alert("이미지를 업로드하고 다시 시도하세요.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", resizedFile);
      const dataPayload = { diagnosisId };
      const dataBlob = new Blob([JSON.stringify(dataPayload)], {
        type: "application/json",
      });
      formData.append("data", dataBlob);

      console.log("📦 백엔드 전송 데이터:");
      console.log("🖼️ image (File):", resizedFile);
      console.log("📄 data (JSON):", dataPayload);

      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        "https://iise-mohitto.store/simulation/recommand",
        {
          method: "POST",
          headers: {
            Authorization: `${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("💇‍♀️ 추천 결과:", result);

      navigate("/ConsultingR", {
        state: result,
      });
    } catch (err) {
      console.error("업로드 실패:", err.message || err);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consult-container">
      <h2 className="consult-title-2">
        | 최적의 헤어스타일을 찾기 위한 설문을 진행합니다.
      </h2>
      <div className="consult-b-container">
        <div className="consult-b-header">
          <h3 className="consult-b-title">이미지 업로드</h3>
        </div>

        <div className="consult-b-steps">
          <span className="step">1</span>
          <span className="step">2</span>
          <span className="step active">3</span>
        </div>

        <div className="consult-b-section">
          <p className="consult-b-label">이미지를 업로드하세요.</p>
          <div className="upload-layout">
            <div className="upload-wrapper">
              <label htmlFor="image-upload" className="upload-clickable">
                {preview ? (
                  <img
                    src={preview}
                    alt="업로드 미리보기"
                    className="preview-image"
                  />
                ) : (
                  <img
                    src={ImageUpload}
                    alt="업로드 UI"
                    className="upload-ui-image"
                  />
                )}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/jpeg, image/jpg"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>

            <img src={guidePicture} alt="사진 가이드" className="guide-image" />
          </div>
        </div>
        <div className="consult-b-submit-wrap">
          <button
            className="consult-b-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "추천 중..." : "제출하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisImage;

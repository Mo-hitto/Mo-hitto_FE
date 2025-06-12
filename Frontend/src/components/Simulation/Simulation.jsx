import React, { useState } from "react";
import styles from "./Simulation.module.css";
import ImageUpload from "../../assets/simulUpload.png";

// 이미지 추출 - 여자
import cloud from "../../assets/Girl/cloud.png";
import grace from "../../assets/Girl/grace.png";
import glam from "../../assets/Girl/glam.png";
import layerdCut from "../../assets/Girl/layerdCut.png";
import layerdPerm from "../../assets/Girl/layerdPerm.png";
import ballet from "../../assets/Girl/ballet.png";
import bang from "../../assets/Girl/bang.png";
import bebe from "../../assets/Girl/bebe.png";
import block from "../../assets/Girl/block.png";
import shaming from "../../assets/Girl/shaming.png";
import slickCut from "../../assets/Girl/slickCut.png";
import slickPerm from "../../assets/Girl/slickPerm.png";
import elli from "../../assets/Girl/elli.png";
import wave from "../../assets/Girl/wave.png";

// 이미지 추출 - 남자
import guile from "../../assets/Boy/guile.png";
import dandy from "../../assets/Boy/dandy.png";
import leaf from "../../assets/Boy/leaf.png";
import shadow from "../../assets/Boy/shadow.png";
import spins from "../../assets/Boy/spins.png";
import sguile from "../../assets/Boy/sguile.png";
import sunder from "../../assets/Boy/sunder.png";
import saz from "../../assets/Boy/saz.png";
import ssdandy from "../../assets/Boy/ssdandy.png";
import ib from "../../assets/Boy/ib.png";
import az from "../../assets/Boy/az.png";
import pring from "../../assets/Boy/pring.png";
import sdandy from "../../assets/Boy/sdandy.png";

const Simulation = () => {
  const [selectedGender, setSelectedGender] = useState("female");
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resizedFile, setResizedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);

  const modelImages = {
    male: [
      { id: 50, src: guile, label: "가일컷" },
      { id: 70, src: leaf, label: "리프컷" },
      { id: 88, src: shadow, label: "쉐도우펌" },
      { id: 94, src: spins, label: "스핀스왈로펌" },
      { id: 98, src: sguile, label: "슬릭가일컷" },
      { id: 122, src: sunder, label: "슬릭백언더컷" },
      { id: 126, src: saz, label: "슬릭애즈펌" },
      { id: 130, src: ssdandy, label: "시스루댄디컷" },
      { id: 139, src: ib, label: "아이비리그컷" },
      { id: 142, src: az, label: "애즈펌" },
      { id: 161, src: pring, label: "프링펌" },
      { id: 166, src: sdandy, label: "슬릭댄디컷" },
      { id: 58, src: dandy, label: "댄디펌" },
    ],
    female: [
      { id: 173, src: cloud, label: "구름펌" },
      { id: 178, src: grace, label: "그레이스펌" },
      { id: 181, src: glam, label: "글램펌" },
      { id: 187, src: layerdCut, label: "레이어드컷" },
      { id: 191, src: layerdPerm, label: "레이어드펌" },
      { id: 209, src: ballet, label: "발레아쥬" },
      { id: 211, src: bang, label: "뱅헤어" },
      { id: 215, src: bebe, label: "베베컷" },
      { id: 219, src: block, label: "블럭컷" },
      { id: 275, src: shaming, label: "샤밍컷" },
      { id: 282, src: slickCut, label: "슬릭컷" },
      { id: 283, src: slickPerm, label: "슬릭펌" },
      { id: 286, src: elli, label: "엘리자베스펌" },
      { id: 290, src: wave, label: "웨이브펌" },
    ],
  };

  const handleModelSelect = (id) => {
    setSelectedModelId(id);
    setResultUrl(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      resizeImage(reader.result);
      setResultUrl(null); // 새 이미지 업로드 시 결과 초기화
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
          if (!blob) return;
          const jpegFile = new File([blob], "upload.jpg", {
            type: "image/jpeg",
          });
          setResizedFile(jpegFile);
        },
        "image/jpeg",
        0.9
      );
    };
    img.src = dataUrl;
  };

  const handleSubmit = async () => {
    if (!resizedFile || !selectedModelId) {
      alert("모델 이미지와 업로드 사진을 모두 선택해주세요.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", resizedFile);
      formData.append(
        "data",
        new Blob([JSON.stringify({ modelImageId: selectedModelId })], {
          type: "application/json",
        })
      );

      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://iise-mohitto.store/simulation/transfer-face",
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("요청 실패");

      const result = await response.json();
      setResultUrl(result.data.resultImageUrl);
      // preview는 유지하여 "이미지 변경" 버튼이 보이도록 함
    } catch (err) {
      alert("요청 실패: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 현재 표시할 이미지 결정
  const getCurrentImage = () => {
    if (resultUrl) {
      return {
        src: resultUrl,
        alt: "시뮬레이션 결과",
        className: styles.resultImage,
      };
    } else if (preview) {
      return { src: preview, alt: "미리보기", className: styles.previewImage };
    } else {
      return {
        src: ImageUpload,
        alt: "파일 선택",
        className: styles.uploadImageOnly,
      };
    }
  };

  const currentImage = getCurrentImage();
  const showFileInput = !preview && !resultUrl;
  const showChangeButton = (preview || resultUrl) && !resultUrl;

  return (
    <div className={styles.container}>
      {/* 왼쪽 탭 */}
      <div className={styles.modelSelector}>
        <div className={styles.genderTabs}>
          {["female", "male"].map((gender) => (
            <button
              key={gender}
              className={`${styles.genderButton} ${
                selectedGender === gender ? styles.active : ""
              }`}
              onClick={() => {
                setSelectedGender(gender);
                setSelectedModelId(null);
              }}
            >
              {gender === "female" ? "여자" : "남자"}
            </button>
          ))}
        </div>

        <div className={styles.modelGrid}>
          {modelImages[selectedGender].map((model) => (
            <div
              key={model.id}
              className={`${styles.modelItem} ${
                selectedModelId === model.id ? styles.selected : ""
              }`}
              onClick={() => handleModelSelect(model.id)}
            >
              <img
                src={model.src}
                alt={model.label}
                className={styles.modelImage}
              />
              <p>{model.label}</p>
            </div>
          ))}
        </div>

        {/* 생성 버튼을 모델 선택기 하단으로 이동 */}
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={loading || !resizedFile || !selectedModelId}
        >
          {loading ? "처리 중..." : "생성"}
        </button>
      </div>

      {/* 시뮬레이션 */}
      <div className={styles.simulationSection}>
        <div className={styles.simulationHeader}>
          {showChangeButton && (
            <button
              className={styles.changeImageButton}
              onClick={() => {
                setPreview(null);
                setResizedFile(null);
                setResultUrl(null);
              }}
            >
              이미지 변경
            </button>
          )}
          <h2>시뮬레이션</h2>
        </div>

        {/* 이미지 표시 영역 - 고정된 크기의 컨테이너 */}
        <div className={styles.imageContainer}>
          {showFileInput ? (
            <label className={styles.uploadImageOnly}>
              <img src={currentImage.src} alt={currentImage.alt} />
              <input
                type="file"
                accept="image/jpeg, image/jpg"
                onChange={handleImageChange}
                className={styles.uploadInput}
              />
            </label>
          ) : (
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className={currentImage.className}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Simulation;

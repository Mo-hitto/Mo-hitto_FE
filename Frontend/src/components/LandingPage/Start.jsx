import React, { useEffect, useRef, useState } from "react";
import "./Start.css";
import KakaoLogin from "../Login/KakaoLogin"; // 모달 컴포넌트 불러오기

const Start = () => {
  const containerRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 관리

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const elements = containerRef.current.querySelectorAll(".hidden");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    setModalOpen(true); // 모달 열기
  };

  return (
    <div className="cta-container" ref={containerRef}>
      <h2 className="cta-heading hidden">
        미용실에서 비싼 비용 들이기 전에, <br />
        모히또에서 먼저 체험하세요!
      </h2>
      <button className="cta-button hidden" onClick={handleClick}>
        무료로 시작하기
      </button>

      {isModalOpen && <KakaoLogin onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Start;

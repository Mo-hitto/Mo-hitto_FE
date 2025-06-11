import React, { useEffect, useRef } from "react";
import "./Function.css";
import func1 from "../../assets/funca/func1.png";
import func11 from "../../assets/funca/func11.png";
import func2 from "../../assets/funca/func2.png";
import func22 from "../../assets/funca/func22.png";
import func3 from "../../assets/funca/func3.png";
import func33 from "../../assets/funca/func33.png";

const Function = () => {
  const featuresRef = useRef([]);

  useEffect(() => {
    const observers = [];

    featuresRef.current.forEach((feature, index) => {
      if (feature) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  entry.target.classList.add("animate-in");
                }, index * 100); // 각 요소마다 200ms 딜레이
              }
            });
          },
          {
            threshold: 0.2,
            rootMargin: "0px 0px -100px 0px",
          }
        );

        observer.observe(feature);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="features-section">
      {/* 첫 번째 기능: AI 추천 */}
      <div
        className="feature-row fade-in-up"
        ref={(el) => (featuresRef.current[0] = el)}
      >
        <div className="feature-content">
          <img
            src={func1}
            alt="AI 헤어스타일 추천 기능"
            className="feature-image"
          />
        </div>
        <div className="feature-info">
          <img
            src={func11}
            alt="AI가 추천하는 맞춤 헤어 스타일 정보"
            className="info-box"
          />
        </div>
      </div>

      {/* 두 번째 기능: 가상 시뮬레이션 */}
      <div
        className="feature-row-reverse fade-in-up"
        ref={(el) => (featuresRef.current[1] = el)}
      >
        <div className="feature-info">
          <img
            src={func22}
            alt="가상으로 경험하는 다양한 헤어 정보"
            className="info-box"
          />
        </div>
        <div className="feature-content">
          <img
            src={func2}
            alt="헤어 가상 시뮬레이션 기능"
            className="feature-image"
          />
        </div>
      </div>

      {/* 세 번째 기능: 미용실 추천 */}
      <div
        className="feature-row fade-in-up"
        ref={(el) => (featuresRef.current[2] = el)}
      >
        <div className="feature-content">
          <img
            src={func3}
            alt="미용실 위치 및 정보 제공 기능"
            className="feature-image"
          />
        </div>
        <div className="feature-info">
          <img
            src={func33}
            alt="스타일에 적합한 미용실 추천 정보"
            className="info-box"
          />
        </div>
      </div>
    </div>
  );
};

export default Function;

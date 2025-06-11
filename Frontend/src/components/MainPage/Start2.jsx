import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../LandingPage/Start.css";

const Start2 = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

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

  return (
    <div className="cta-container" ref={containerRef}>
      <h2 className="cta-heading hidden">
        미용실에서 비싼 비용 들이기 전에, <br />
        모히또에서 먼저 체험하세요!
      </h2>
      <button
        className="cta-button hidden"
        onClick={() => navigate("/consulting")}
      >
        컨설팅 시작하기
      </button>
    </div>
  );
};

export default Start2;

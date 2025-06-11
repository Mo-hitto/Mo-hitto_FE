import React, { useEffect, useRef, useState } from "react";
import styles from "./Soong.module.css";
import kakao1 from "../../assets/funca/kakao1.png";
import kakao2 from "../../assets/funca/kakao2.png";
import kakao3 from "../../assets/funca/kakao3.png";
import character from "../../assets/funca/character.png";

const Soong = () => {
  const messageImages = [
    { id: 1, src: kakao1, alt: "첫 번째 메시지" },
    { id: 2, src: kakao2, alt: "두 번째 메시지" },
    { id: 3, src: kakao3, alt: "세 번째 메시지" },
  ];

  const [visibleMessages, setVisibleMessages] = useState([false, false, false]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          messageImages.forEach((_, index) => {
            setTimeout(() => {
              setVisibleMessages((prev) => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
              });
            }, index * 500); // 메시지마다 400ms 간격으로 등장
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.mohidoSection} ref={sectionRef}>
      <div className={styles.contentContainer}>
        <div className={styles.titleSection}>
          <h1 className={styles.mainTitle}>
            <span className={styles.colorPrimary}>모히또</span>{" "}
            <span className={styles.colorSecondary}>와 함께하고</span>
          </h1>
          <h2 className={styles.subTitle}>
            <span className={styles.colorPrimary}>머리,</span>{" "}
            <span className={styles.colorSecondary}>더이상 망하지 마세요.</span>
          </h2>
        </div>
        <div className={styles.bottomContent}>
          <div className={styles.chatMessages}>
            {messageImages.map((msgImg, index) => (
              <div
                key={msgImg.id}
                className={`${styles.messageBox} ${
                  styles[`message${index + 1}`]
                } ${visibleMessages[index] ? styles.fadeIn : ""}`}
              >
                <img
                  src={msgImg.src}
                  alt={msgImg.alt}
                  className={styles.messageImage}
                />
              </div>
            ))}
          </div>
          <div className={styles.characterSection}>
            <img
              src={character}
              alt="모히도 캐릭터"
              className={styles.characterImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Soong;

import { useEffect, useState } from "react";
import hearted from "../../assets/hearted.png";
import "./ScrapHair.css";

const ScrapHair = () => {
  const [hairList, setHairList] = useState([]);

  const fetchLikedImages = async () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!userId || !token) {
      console.warn("🔑 유저 정보가 없습니다.");
      return;
    }

    try {
      const query = encodeURIComponent(JSON.stringify({ userId }));

      const response = await fetch(
        `http://43.203.208.49:8080/mypage/my-liked-images?authUserInfo=${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      const result = await response.json();
      console.log("✅ 좋아요 목록 불러오기:", result);

      if (response.ok && Array.isArray(result.data)) {
        setHairList(result.data);
      } else {
        console.warn("⚠️ 예상 외 응답:", result);
        setHairList([]);
      }
    } catch (error) {
      console.error("🚨 목록 요청 실패:", error);
      setHairList([]);
    }
  };

  const handleUnlike = async (hairId, imageUrl) => {
    const token = localStorage.getItem("accessToken");

    if (!hairId || !imageUrl || !token) {
      alert("좋아요 취소할 수 없습니다.");
      return;
    }

    try {
      const response = await fetch(
        "http://43.203.208.49:8080/simulation/like-toggle",
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hairId: hairId,
            imageUrl: imageUrl,
          }),
        }
      );

      const result = await response.json();
      console.log("📥 좋아요 토글 응답:", result);

      if (response.ok && result.success) {
        const likedStatus = result.data?.liked;

        if (likedStatus === false || likedStatus === "false") {
          // 디버깅용 로그 추가
          console.log("제거할 hairId:", hairId, typeof hairId);
          console.log(
            "현재 hairList:",
            hairList.map((h) => ({
              id: h.createdImageId,
              type: typeof h.createdImageId,
            }))
          );

          setHairList((prev) => {
            const filtered = prev.filter((hair) => {
              // 문자열과 숫자 비교를 위해 둘 다 문자열로 변환
              return String(hair.createdImageId) !== String(hairId);
            });
            console.log("필터링 후:", filtered.length, "개 남음");
            return filtered;
          });

          console.log("✅ 좋아요 취소 완료");
        } else {
          console.warn("⚠️ 좋아요 상태:", likedStatus);
        }
      } else {
        console.warn("⚠️ 응답이 성공적이지 않음:", result);
      }
    } catch (err) {
      console.error("❌ 좋아요 취소 실패:", err);
      alert("좋아요 취소 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchLikedImages();
  }, []);

  return (
    <div className="scrap-hair-container">
      <h2 className="scrap-title">| 저장한 헤어</h2>
      <div className="scrap-hair-list">
        {hairList.length > 0 ? (
          hairList.map((hair) => (
            <div key={hair.createdImageId} className="scrap-hair-card">
              <div className="scrap-hair-header">
                <h3 className="scrap-name">{hair.hairName}</h3>
                <img
                  src={hearted}
                  alt="좋아요 취소"
                  className="scrap-heart-icon"
                  onClick={() =>
                    handleUnlike(hair.createdImageId, hair.imageUrl)
                  }
                />
              </div>
              <img
                src={hair.imageUrl}
                alt={hair.hairName}
                className="scrap-image"
              />
            </div>
          ))
        ) : (
          <p className="scrap-empty">좋아요한 이미지가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ScrapHair;

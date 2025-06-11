import { useEffect, useState } from "react";
import hearted from "../../assets/hearted.png"; // 하트 아이콘
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
      console.log("✅ 좋아요 이미지 목록:", result);

      if (response.ok && Array.isArray(result.data)) {
        setHairList(result.data);
      } else {
        console.warn("⚠️ 예상과 다른 응답:", result);
        setHairList([]);
      }
    } catch (error) {
      console.error("🚨 요청 실패:", error);
      setHairList([]);
    }
  };

  const handleUnlike = async (hairId, imageUrl) => {
    const token = localStorage.getItem("accessToken");

    if (!hairId || !imageUrl || !token) {
      alert("좋아요 취소할 수 없습니다.");
      return;
    }

    console.log("📡 좋아요 토글 요청 body:", { hairId, imageUrl });

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
            hairId,
            imageUrl,
          }),
        }
      );

      const result = await response.json();
      console.log("📥 좋아요 토글 응답:", result);

      if (response.ok && result.success && result.data) {
        // 서버에서는 liked 여부를 리턴하지 않음 → 프론트에서 상태를 유추
        // 따라서, 프론트 입장에서는 그냥 UI에서 제거해도 문제 없음
        setHairList((prev) =>
          prev.filter((hair) => hair.createdImageId !== hairId)
        );
      } else {
        throw new Error("좋아요 토글 실패");
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
              <button className="scrap-detail-button">상세보기</button>
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

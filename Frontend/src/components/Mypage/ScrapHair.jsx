import { useEffect, useState } from "react";
import hearted from "../../assets/hearted.png";
import "./ScrapHair.css";

const ScrapHair = () => {
  const [hairList, setHairList] = useState([]);

  // 좋아요된 헤어스타일 목록 불러오기
  const fetchLikedImages = async () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    if (!userId || !token) return;

    try {
      const query = encodeURIComponent(JSON.stringify({ userId }));
      const url = `https://iise-mohitto.store/mypage/my-liked-images?authUserInfo=${query}`;

      console.log("📤 [GET] my-liked-images 요청 URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      const result = await response.json();
      console.log("📥 [GET] my-liked-images 응답:", result);

      if (response.ok && Array.isArray(result.data)) {
        setHairList(result.data); // ✅ 여기로 고치면 리스트 뜬다
      } else {
        setHairList([]);
      }
    } catch (error) {
      console.error("❌ 좋아요 목록 불러오기 실패:", error);
      setHairList([]);
    }
  };

  const handleUnlike = async (hair) => {
    const token = localStorage.getItem("accessToken");

    if (!token || !hair?.imageUrl || !hair?.hairId) {
      console.warn("❌ hairId 누락됨:", hair);
      return;
    }

    setHairList((prev) =>
      prev.filter(
        (item) => String(item.createdImageId) !== String(hair.createdImageId)
      )
    );

    const requestBody = {
      hairId: hair.hairId,
      imageUrl: hair.imageUrl,
    };

    console.log("📤 [POST] like-toggle 요청 바디:", requestBody);

    fetch("https://iise-mohitto.store/simulation/like-toggle", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log("📥 [POST] like-toggle 응답:", resData);
      })
      .catch((err) => console.error("❌ 좋아요 취소 요청 실패:", err));
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
                  alt="스크랩 해제"
                  className="scrap-heart-icon"
                  onClick={() => handleUnlike(hair)}
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

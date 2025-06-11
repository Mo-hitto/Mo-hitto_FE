import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShopRecommend from "./ShopRecommend";
import Scrap from "../../assets/Scrap.png";
import Scrapped from "../../assets/Scrapped.png";
import "./DetailHair.css";

const DetailHair = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const modelImageIdFromState = location.state?.modelImageId;
  const hasCalledRef = useRef(false);

  const [resultImageUrl, setResultImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [styleData, setStyleData] = useState({});
  const [selectedShop, setSelectedShop] = useState(null);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(""); // 에러 상태 추가

  useEffect(() => {
    if (hasCalledRef.current) return; // 이미 호출했으면 return

    const storedStyle = localStorage.getItem("selectedStyle");

    if (!storedStyle) {
      alert("스타일 정보가 없습니다. 이전 페이지에서 다시 시도해주세요.");
      return;
    }

    const parsed = JSON.parse(storedStyle);
    const modelImageId = modelImageIdFromState || parsed.modelImageId;

    if (!modelImageId || !parsed.hairId) {
      alert("필요한 ID 정보가 없습니다.");
      return;
    }

    setStyleData({
      style: parsed.style,
      description: parsed.description,
      hair_shops: parsed.hair_shops,
      hairId: parsed.hairId,
    });

    const fetchImage = async () => {
      hasCalledRef.current = true; // 호출 표시

      try {
        const accessToken = localStorage.getItem("accessToken");

        const payload = {
          hairId: parsed.hairId,
          modelImageId: modelImageId,
        };

        console.log("🛰️ 전송 데이터:", payload); // 콘솔 로그 추가

        const response = await fetch(
          "http://43.203.208.49:8080/simulation/recommand/transfer-face",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${accessToken}`,
            },
            body: JSON.stringify(payload),
          }
        );

        console.log("📡 응답 상태:", response.status, response.statusText);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ 서버 응답 에러:", errorText);
          throw new Error(`시뮬레이션 요청 실패: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ 전체 응답 데이터:", result);

        // 다양한 응답 구조에 대응
        let imageUrl = "";
        if (result.resultImageUrl) {
          imageUrl = result.resultImageUrl;
        } else if (result.imageUrl) {
          imageUrl = result.imageUrl;
        } else if (result.data?.resultImageUrl) {
          imageUrl = result.data.resultImageUrl;
        } else if (result.data?.imageUrl) {
          imageUrl = result.data.imageUrl;
        } else if (typeof result === "string" && result.startsWith("http")) {
          // 응답이 문자열 URL인 경우
          imageUrl = result;
        }

        console.log("🖼️ 추출된 이미지 URL:", imageUrl);

        if (imageUrl) {
          setResultImageUrl(imageUrl);
        } else {
          console.error("❌ 응답에서 이미지 URL을 찾을 수 없습니다:", result);
          setError("이미지 URL을 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("❌ 이미지 시뮬레이션 실패:", err);
        setError(`이미지 생성 실패: ${err.message}`);
        hasCalledRef.current = false; // 실패시 다시 호출 가능하도록
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [location.state?.modelImageId]);

  const handleToggleLike = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const hairId = styleData.hairId;
    const imageUrl = resultImageUrl;

    if (!hairId || !imageUrl) {
      alert("좋아요 처리를 위한 정보가 부족합니다.");
      return;
    }

    // hairId가 숫자인지 확인하고 변환
    const numericHairId = parseInt(hairId);
    if (isNaN(numericHairId)) {
      alert("헤어 ID가 올바르지 않습니다.");
      return;
    }

    console.log("🔍 좋아요 요청 데이터:", {
      hairId: numericHairId,
      imageUrl: imageUrl,
    });

    // 임시로 UI 상태를 먼저 업데이트 (낙관적 업데이트)
    const previousLiked = liked;
    setLiked(!liked);

    try {
      const response = await fetch(
        "http://43.203.208.49:8080/simulation/like-toggle",
        {
          method: "POST",
          headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hairId: numericHairId,
            imageUrl: imageUrl,
          }),
        }
      );

      console.log("📡 좋아요 응답 상태:", response.status, response.statusText);

      if (!response.ok) {
        // 실패시 이전 상태로 되돌림
        setLiked(previousLiked);

        const errorText = await response.text();
        console.error("❌ 좋아요 에러 응답:", errorText);
        throw new Error(`좋아요 요청 실패: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("❤️ 좋아요 응답:", result);

      // 서버 응답에 따라 실제 상태 설정
      if (typeof result.liked === "boolean") {
        setLiked(result.liked);
      } else if (result.liked === "true") {
        setLiked(true);
      } else if (result.liked === "false") {
        setLiked(false);
      } else if (result.message && result.message.includes("추가")) {
        setLiked(true);
      } else if (result.message && result.message.includes("제거")) {
        setLiked(false);
      }
      // 만약 서버에서 명확한 상태를 주지 않으면 현재 UI 상태 유지
    } catch (err) {
      // 에러 발생시 이전 상태로 되돌림
      setLiked(previousLiked);
      console.error("❌ 좋아요 처리 실패:", err);
      alert(`좋아요 처리 중 문제가 발생했습니다: ${err.message}`);
    }
  };

  const dataReady = !!styleData?.style;

  return (
    <div className="detail-hair-container">
      <div className="detail-header">
        <h2 className="detail-title">{styleData?.style || "스타일 미지정"}</h2>
        <img
          src={liked ? Scrapped : Scrap}
          alt={liked ? "스크랩됨" : "스크랩"}
          className="scrappppp"
          onClick={handleToggleLike}
          style={{ cursor: "pointer" }}
        />
      </div>

      {loading ? (
        <div className="loading-container">
          <p>이미지 생성 중입니다...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            다시 시도
          </button>
        </div>
      ) : (
        dataReady && (
          <div className="detail-card">
            {resultImageUrl ? (
              <div className="image-container">
                <img
                  src={resultImageUrl}
                  alt="스타일 시뮬레이션 결과"
                  className="result-image"
                  onLoad={() =>
                    console.log("✅ 이미지 로드 성공:", resultImageUrl)
                  }
                  onError={(e) => {
                    console.error("❌ 이미지 로드 실패:", resultImageUrl);
                    console.error("❌ 이미지 에러 상세:", e);
                    setError("이미지를 불러올 수 없습니다.");
                  }}
                />
              </div>
            ) : (
              <div className="result-image-placeholder">
                시뮬레이션 이미지를 불러올 수 없습니다.
              </div>
            )}
            <div className="style-info">
              <div className="style-info-content">
                <h4>디자인 설명</h4>
                <p>{styleData.description}</p>
                {styleData.hair_shops?.length > 0 && (
                  <div className="hair-shops-section">
                    <h4>추천 미용실</h4>
                    <ul>
                      {styleData.hair_shops.map((shop, index) => (
                        <li
                          key={index}
                          className="shop-link"
                          onClick={() => setSelectedShop(shop)}
                        >
                          {shop}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      )}

      {selectedShop && (
        <ShopRecommend
          queryName={selectedShop}
          onClose={() => setSelectedShop(null)}
        />
      )}
    </div>
  );
};

export default DetailHair;

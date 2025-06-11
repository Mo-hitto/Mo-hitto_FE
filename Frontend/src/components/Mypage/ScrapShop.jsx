import { useEffect, useState } from "react";
import hearted from "../../assets/hearted.png"; // 하트 아이콘
import link from "../../assets/link.png";
import linkhover from "../../assets/linkhover.png";
import "./ScrapShop.css";

const ScrapShop = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredLinkId, setHoveredLinkId] = useState(null);

  const fetchSavedSalons = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = parseInt(localStorage.getItem("userId"), 10);

    if (!userId || !accessToken) {
      console.warn("🔑 로그인 정보가 없습니다.");
      setLoading(false);
      return;
    }

    try {
      const query = encodeURIComponent(JSON.stringify({ userId }));
      const response = await fetch(
        `http://43.203.208.49:8080/mypage/salons/saved?authUserInfo=${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok && Array.isArray(result.data)) {
        setSalons(result.data);
      } else {
        console.warn("⚠️ 데이터 구조가 예상과 다릅니다:", result);
        setSalons([]);
      }
    } catch (error) {
      console.error("🚨 미용실 조회 실패:", error);
      setSalons([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (salonId) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = parseInt(localStorage.getItem("userId"), 10);

    if (!userId || !accessToken || !salonId) {
      alert("삭제할 수 없습니다.");
      return;
    }

    try {
      const query = encodeURIComponent(JSON.stringify({ userId }));
      const response = await fetch(
        `http://43.203.208.49:8080/mypage/salons/saved/${salonId}?authUserInfo=${query}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error("삭제 실패");

      // UI에서 바로 제거
      setSalons((prev) => prev.filter((s) => s.id !== salonId));
    } catch (err) {
      console.error("❌ 삭제 실패:", err);
      alert("삭제 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchSavedSalons();
  }, []);

  return (
    <div className="scrapshop-container">
      <h2 className="scrapshop-title">| 저장한 미용실</h2>
      {loading ? (
        <p>불러오는 중...</p>
      ) : salons.length === 0 ? (
        <p className="scrapshop-empty">저장한 미용실이 없습니다.</p>
      ) : (
        <div className="scrapshop-list">
          {salons.map((salon) => (
            <div className="scrapshop-card" key={salon.id}>
              <div className="scrapshop-header">
                <h3 dangerouslySetInnerHTML={{ __html: salon.name }} />
                <img
                  src={hearted}
                  alt="삭제"
                  className="scrapshop-heart-icon"
                  onClick={() => handleDelete(salon.id)}
                />
              </div>
              <p>위치: {salon.address}</p>
              {salon.telephone && <p>전화번호: {salon.telephone}</p>}
              {salon.link && (
                <a
                  href={salon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="scrapshop-link"
                  onMouseEnter={() => setHoveredLinkId(salon.id)}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
                  Link
                  <img
                    src={hoveredLinkId === salon.id ? linkhover : link}
                    alt="링크 아이콘"
                    className="scrapshop-link-icon"
                  />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScrapShop;

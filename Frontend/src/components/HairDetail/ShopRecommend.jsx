import { useEffect, useState, useRef } from "react";
import link from "../../assets/link.png";
import linkhover from "../../assets/linkhover.png";
import heart from "../../assets/heart.png";
import hearted from "../../assets/hearted.png";
import "./ShopRecommend.css";

const convertScaledCoordToLatLng = (x, y) => {
  const parsedX = parseFloat(x);
  const parsedY = parseFloat(y);
  return isNaN(parsedX) || isNaN(parsedY)
    ? { lat: null, lng: null }
    : { lat: parsedY / 1e7, lng: parsedX / 1e7 };
};

const isValidCoord = (val) =>
  val !== null && val !== undefined && val !== "" && !isNaN(parseFloat(val));

const ShopRecommend = ({ queryName, onClose }) => {
  const [shop, setShop] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedSalonId, setSavedSalonId] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchShopAndSavedList = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const userId = parseInt(localStorage.getItem("userId"), 10);
      if (!accessToken || !userId) return;

      try {
        const res = await fetch(
          `https://iise-mohitto.store/salon/naver?query=${queryName}`,
          { headers: { Authorization: `${accessToken}` } }
        );
        const data = await res.json();
        if (!res.ok || !data.data) return;
        setShop(data.data);
        await fetchSavedStatus(data.data.address);
      } catch (err) {
        console.error("❌ 미용실 조회 오류:", err);
      }
    };

    fetchShopAndSavedList();
  }, [queryName]);

  const fetchSavedStatus = async (address) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = parseInt(localStorage.getItem("userId"), 10);
    if (!accessToken || !userId || !address) return;

    const userQuery = encodeURIComponent(JSON.stringify({ userId }));
    try {
      const savedRes = await fetch(
        `https://iise-mohitto.store/mypage/salons/saved?authUserInfo=${userQuery}`,
        { headers: { Authorization: `${accessToken}` } }
      );
      const savedData = await savedRes.json();
      const match = savedData?.data?.find((salon) => salon.address === address);
      setIsSaved(!!match);
      setSavedSalonId(match?.id ?? null);
    } catch (err) {
      console.error("❌ 저장 여부 조회 실패:", err);
    }
  };

  const toggleSave = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = parseInt(localStorage.getItem("userId"), 10);
    if (!accessToken || !userId || !shop?.address) return;

    const userQuery = encodeURIComponent(JSON.stringify({ userId }));
    try {
      if (!isSaved) {
        const address = encodeURIComponent(shop.address);
        const res = await fetch(
          `https://iise-mohitto.store/salon/save?authUserInfo=${userQuery}&address=${address}`,
          {
            method: "POST",
            headers: { Authorization: `${accessToken}` },
          }
        );
        if (!res.ok) throw new Error("저장 실패");
      } else {
        const res = await fetch(
          `https://iise-mohitto.store/mypage/salons/saved/${savedSalonId}?authUserInfo=${userQuery}`,
          {
            method: "DELETE",
            headers: { Authorization: `${accessToken}` },
          }
        );
        if (!res.ok) throw new Error("삭제 실패");
      }
      await fetchSavedStatus(shop.address);
    } catch (err) {
      console.error("❤️ 저장 상태 변경 실패:", err);
    }
  };

  useEffect(() => {
    if (
      shop &&
      isValidCoord(shop.mapx) &&
      isValidCoord(shop.mapy) &&
      window.naver &&
      mapRef.current
    ) {
      const { lat, lng } = convertScaledCoordToLatLng(shop.mapx, shop.mapy);
      if (!lat || !lng) return;

      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(lat, lng),
        zoom: 16,
      });

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
      });
    }
  }, [shop]);

  if (!shop) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>

        <div className="popup-header">
          <div className="popup-title-wrapper">
            <h2
              className="popup-title"
              dangerouslySetInnerHTML={{ __html: shop.title }}
            />
          </div>
        </div>

        <div className="popup-map-wrapper">
          <div className="popup-heart-icon-wrapper">
            <img
              src={isSaved ? hearted : heart}
              alt="하트"
              className="popup-heart-icon"
              onClick={toggleSave}
            />
          </div>
          <div ref={mapRef} className="popup-map" />
        </div>

        {shop.description && (
          <p className="popup-description">{shop.description}</p>
        )}
        {shop.address && <p className="popup-subtext">위치: {shop.address}</p>}
        {shop.telephone && (
          <p className="popup-subtext">tel: {shop.telephone}</p>
        )}
        {shop.link && (
          <a
            href={shop.link}
            target="_blank"
            rel="noopener noreferrer"
            className="popup-link"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Link
            <img
              src={isHovered ? linkhover : link}
              alt="외부 링크"
              className="popup-link-icon-img"
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default ShopRecommend;

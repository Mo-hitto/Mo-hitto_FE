import { useEffect, useState, useRef } from "react";
import link from "../../assets/link.png";
import linkhover from "../../assets/linkhover.png";
import "./ShopRecommend.css";

const convertScaledCoordToLatLng = (x, y) => {
  const parsedX = parseFloat(x);
  const parsedY = parseFloat(y);
  if (isNaN(parsedX) || isNaN(parsedY)) return { lat: null, lng: null };
  return { lat: parsedY / 1e7, lng: parsedX / 1e7 };
};

const isValidCoord = (val) =>
  val !== null && val !== undefined && val !== "" && !isNaN(parseFloat(val));

const ShopRecommend = ({ queryName, onClose }) => {
  const [shop, setShop] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchShop = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://43.203.208.49:8080/salon/naver?query=${queryName}`,
        {
          method: "GET",
          headers: {
            Authorization: ` ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) setShop(data.data);
    };

    fetchShop();
  }, [queryName]);

  useEffect(() => {
    if (
      shop &&
      isValidCoord(shop.mapx) &&
      isValidCoord(shop.mapy) &&
      window.naver &&
      mapRef.current
    ) {
      const { lat, lng } = convertScaledCoordToLatLng(shop.mapx, shop.mapy);
      if (!lat || !lng || isNaN(lat) || isNaN(lng)) return;

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
        <h2
          className="popup-title"
          dangerouslySetInnerHTML={{ __html: shop.title }}
        />
        <div ref={mapRef} className="popup-map" />
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

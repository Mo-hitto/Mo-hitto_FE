import React, { useState } from "react";
import ShopRecommend from "./ShopRecommed";

const DetailHair = () => {
  const [selectedShopName, setSelectedShopName] = useState(null);

  const shopNames = ["하츠도산", "에이바헤어"];

  return (
    <div className="hair-detail-container">
      <h2 className="hair-title">내추럴 레이어드컷</h2>

      <div className="hair-detail-card">
        <img src="/hair.jpg" alt="헤어스타일" className="hair-image" />

        <div className="hair-detail-info">
          <h4>디자인 설명</h4>
          <p>가볍게 흐르는 느낌의 자연스러운 웨이브 스타일</p>

          <h4>추천 미용실</h4>
          {shopNames.map((name) => (
            <p
              key={name}
              className="shop-link"
              onClick={() => setSelectedShopName(name)}
            >
              {name}
            </p>
          ))}
        </div>
      </div>

      {selectedShopName && (
        <ShopRecommend
          queryName={selectedShopName}
          onClose={() => setSelectedShopName(null)}
        />
      )}
    </div>
  );
};

export default DetailHair;

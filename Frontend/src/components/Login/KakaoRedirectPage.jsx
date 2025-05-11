// KakaoRedirectPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    const fetchKakaoLogin = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/kakao",
          {
            code,
          }
        );

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        navigate("/");
      } catch (err) {
        console.error("카카오 로그인 실패", err);
        alert("로그인 실패");
      }
    };

    if (code) fetchKakaoLogin();
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoRedirectPage;

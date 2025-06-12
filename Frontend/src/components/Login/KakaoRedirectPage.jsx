import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const KakaoRedirectPage = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const code = new URL(window.location.href).searchParams.get("code");

    const sendCodeToBackend = async () => {
      try {
        const response = await fetch(
          "https://iise-mohitto.store/oauth2/login/kakao",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ authorizationCode: code }),
          }
        );

        const result = await response.json();
        console.log("🎯 백엔드 응답:", result);

        const success = result.success ?? result.isSuccess;
        if (!success) {
          alert(result.message || "로그인 실패");
          navigate("/login");
          return;
        }

        const accessToken = result.data?.accessToken;
        const refreshToken = result.data?.refreshToken;
        const userId = result.data?.id; // ✅ userId 추출

        if (!accessToken || !userId) {
          alert("accessToken 또는 userId 없음");
          navigate("/login");
          return;
        }

        // ✅ 토큰 및 userId 저장
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }

        console.log("✅ 로그인 성공");
        navigate("/main");
      } catch (err) {
        console.error("❌ 예외 발생:", err.message || err);
        alert("서버 통신 오류");
        navigate("/login");
      }
    };

    if (code) sendCodeToBackend();
  }, [navigate]);

  return <div></div>;
};

export default KakaoRedirectPage;

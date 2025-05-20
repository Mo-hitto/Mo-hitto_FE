import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    const sendCodeToBackend = async () => {
      try {
        const response = await fetch(
          "http://43.203.208.49:8080/oauth2/login/kakao",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ authorizationCode: code }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { grantType, accessToken, refreshToken } = await response.json();
        const bearerToken = `${grantType} ${accessToken}`;

        localStorage.setItem("accessToken", bearerToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("accessToken:", bearerToken);

        navigate("/main");
      } catch (err) {
        console.error("카카오 로그인 실패:", err);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/login");
      }
    };

    if (code) sendCodeToBackend();
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
};

export default KakaoRedirectPage;

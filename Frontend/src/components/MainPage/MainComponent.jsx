import { useEffect } from "react";

const MainComponent = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("accessToken", `Bearer ${token}`);
      window.history.replaceState({}, "", "/main/main");
    }
  }, []);

  return (
    <div>
      <h1>메인 페이지</h1>
    </div>
  );
};

export default MainComponent;

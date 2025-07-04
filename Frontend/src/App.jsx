import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Consulting from "./pages/Consultant/Consulting";
import Login from "./pages/Login";
import KakaoRedirectPage from "./components/Login/KakaoRedirectPage";
import Main from "./pages/Main";
import Simulation from "./pages/Simulation/Simulation";
import Simulation2 from "./pages/Simulation/Simulation2";
import BasicDiagnosis from "./pages/Consultant/BasicDiagnosis";
import PreferDiagnosis from "./pages/Consultant/PreferDiagnosis";
import ImageUpload from "./pages/Consultant/ImageUpload";
import HairShop from "./pages/Hair/HairShop";
import HairDetail from "./pages/Hair/HairDetail";
import Myhome from "./pages/Mypage/Myhome";
import Myhair from "./pages/Mypage/Myhair";
import Myshop from "./pages/Mypage/Myshop";
import ConsultingR from "./pages/Consultant/ConsultingR";

// 스크롤을 최상단으로 이동시키는 컴포넌트
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth2/kakao/callback" element={<KakaoRedirectPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/basicDiagnosis" element={<BasicDiagnosis />} />
        <Route path="/preferDiagnosis" element={<PreferDiagnosis />} />
        <Route path="/imageUpload" element={<ImageUpload />} />
        <Route path="/consultingR" element={<ConsultingR />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/simulation2" element={<Simulation2 />} />
        <Route path="/hairDetail" element={<HairDetail />} />
        <Route path="/hairShop" element={<HairShop />} />
        <Route path="/myhome" element={<Myhome />} />
        <Route path="/myhair" element={<Myhair />} />
        <Route path="/myshop" element={<Myshop />} />
      </Routes>
    </>
  );
}

export default App;

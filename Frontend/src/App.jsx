import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Consulting from "./pages/Consulting";
import Login from "./pages/Login";
import KakaoRedirectPage from "./components/Login/KakaoRedirectPage";
import Main from "./pages/Main";
import Simulation from "./pages/Simulation";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth2/kakao/callback" element={<KakaoRedirectPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </>
  );
}

export default App;

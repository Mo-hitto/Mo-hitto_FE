import "./App.css";
import { Routes, Route } from "react-router-dom";
import Consulting from "./pages/Consulting";
import Login from "./pages/Login";
import KakaoRedirectPage from "./components/Login/KakaoRedirectPage";
import Main from "./pages/Main";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<KakaoRedirectPage />} />
        <Route path="/main/main" element={<Main />} />
        <Route path="/consulting" element={<Consulting />} />
      </Routes>
    </>
  );
}

export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Consulting from "./pages/Consulting";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/consulting" element={<Consulting />} />
      </Routes>
    </>
  );
}

export default App;

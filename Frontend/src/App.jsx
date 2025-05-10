import "./App.css";
import { Routes, Route } from "react-router-dom";
import Consulting from "./pages/Consulting";

function App() {
  return (
    <>
      <Routes>
        <Route path="/consulting" element={<Consulting />} />
      </Routes>
    </>
  );
}

export default App;

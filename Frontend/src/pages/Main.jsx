import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Function from "../components/LandingPage/Function.jsx";
import Soong from "../components/LandingPage/Soong.jsx";
import Hero2 from "../components/MainPage/Hero2";
import Start2 from "../components/MainPage/Start2";

function Main() {
  return (
    <div>
      <Header />
      <Hero2 />
      <Function />
      <Soong />
      <Start2 />
      <Footer />
    </div>
  );
}

export default Main;

import LandingHead from "../components/LandingPage/LandingHead";
import Footer from "../components/Footer";
import Hero from "../components/LandingPage/Hero";
import Function from "../components/LandingPage/Function.jsx";
import Soong from "../components/LandingPage/Soong.jsx";
import Start from "../components/LandingPage/Start.jsx";

function Landing() {
  return (
    <div>
      <LandingHead />
      <Hero />
      <Function />
      <Soong />
      <Start />
      <Footer />
    </div>
  );
}

export default Landing;

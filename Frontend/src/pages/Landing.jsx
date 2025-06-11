import LandingHead from "../components/LandingPage/LandingHead";
import Footer from "../components/Footer";
import Hero from "../components/LandingPage/Hero";
import Function from "../components/LandingPage/function";
import Soong from "../components/LandingPage/soong";
import Start from "../components/LandingPage/start";

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

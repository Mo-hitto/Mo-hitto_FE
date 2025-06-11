import LandingHead from "../components/LandingPage/LandingHead";
import Footer from "../components/Footer";
import Hero from "../components/LandingPage/Hero";
import Function from "../components/LandingPage/Function";
import Soong from "../components/LandingPage/Soong";
import Start from "../components/LandingPage/Start";

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

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ConsultResult from "../../components/HairConsult/ConsultResult";
import { useLocation } from "react-router-dom";

function ConsultingR() {
  const location = useLocation();
  const recommendations = location.state?.recommendations;

  return (
    <div>
      <Header />
      <ConsultResult recommendations={recommendations} />
      <Footer />
    </div>
  );
}

export default ConsultingR;

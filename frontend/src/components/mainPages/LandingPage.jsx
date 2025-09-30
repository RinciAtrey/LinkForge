import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainSection from "../MainSection";
import ShortLinkSection from "../ShortLinkSection";
import AboutPage from "./AboutPage";

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    const targetFromState = location?.state?.scrollTo;
    const hash = location?.hash?.replace("#", "");
    const target = targetFromState || hash;

    if (target) {
     
      setTimeout(() => {
        const el = document.getElementById(target);
        const nav = document.querySelector("nav");
        const navHeight = nav ? nav.getBoundingClientRect().height : 0;
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 8; // small gap
          window.scrollTo({ top, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 60);
    }
 
  }, [location]);

  return (
    <div>
    
      <section id="home">
        <MainSection />
      </section>
       
      <section id="about">
        <AboutPage />
      </section>

      <section id="services">
        <ShortLinkSection />
      </section>


    </div>
  );
};

export default LandingPage;

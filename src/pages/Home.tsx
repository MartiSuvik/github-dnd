import { useEffect } from "react";
import { Helmet } from "react-helmet";
import HomeHeroTop from "../components/home/HomeHeroTop";
import HomeCollections from "../components/home/HomeCollections";
import HomeProjectsCards from "../components/home/HomeProjectsCards";
import HomeHowWeWork from "../components/home/HomeHowWeWork";
import HomeHistorySection from "../components/home/HomeHistorySection";
import HomeHeroBottom from "../components/home/HomeHeroBottom";
import VisionnaireSection from "../components/home/VisionnaireSection";
import SustainabilitySection from "../components/home/SustainabilitySection";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      <Helmet>
        <title>D&D Design Center | Home</title>
        <meta
          name="description"
          content="Welcome to D&D Design Center. Discover our luxury custom furniture and crafted interiors."
        />
      </Helmet>
      <main className="pb-16">
        <HomeHeroTop />
        <HomeProjectsCards />
        <HomeCollections />
        <HomeHowWeWork />
        <SustainabilitySection />
        <VisionnaireSection />
        <HomeHistorySection />
        <HomeHeroBottom />
      </main>
    </div>
  );
}

export default Home;

import HeroSection from "./HeroSection";
import Introduction from "./Introduction";
import MeetTheTeam from "./MeetTheTeam";
import CategoriesOverview from "./CategoriesOverview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <hr id="introduction" className="featurette-divider" />      
      <Introduction />
      <hr className="featurette-divider" />
      <CategoriesOverview />     
      <hr className="featurette-divider" />
      <MeetTheTeam />
      <hr className="featurette-divider" />
    </>
  );
}

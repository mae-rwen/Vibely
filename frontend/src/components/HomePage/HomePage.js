import HeroSection from "./HeroSection";
import Introduction from "./Introduction";
import MeetTheTeam from "./MeetTheTeam";
import CategoriesOverview from "./CategoriesOverview";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <hr class="featurette-divider" />      
      <Introduction />
      <hr class="featurette-divider" />
      <CategoriesOverview />     
      <hr class="featurette-divider" />
      <MeetTheTeam />
    </div>
  );
}

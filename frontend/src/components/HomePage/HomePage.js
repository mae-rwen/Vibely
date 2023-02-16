import HeroSection from "./HeroSection";
import Introduction from "./Introduction";
import MeetTheTeam from "./MeetTheTeam";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <hr class="featurette-divider" />
      <Introduction />
      <hr class="featurette-divider" />
      <MeetTheTeam />
    </div>
  );
}

import "./App.css";
import HeroSection from "./components/HomePage/HeroSection";
import Introduction from "./components/HomePage/Introduction";
import MeetTheTeam from "./components/HomePage/MeetTheTeam";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="App">
      <Container>
        <HeroSection />
        <hr />
        <Introduction />
        <hr />
        <MeetTheTeam />
      </Container>
    </div>
  );
}

export default App;

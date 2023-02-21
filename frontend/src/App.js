import Header from "./components/GeneralComponents/Header";
import { Routes, Route } from "react-router-dom";
import Categories from "./components/Categories/Categories";
import Instructions from "./components/Instructions/Instructions";
import Footer from "./components/GeneralComponents/Footer";
import Container from "react-bootstrap/Container";
import HomePage from "./components/HomePage/HomePage";
import ScrollToTop from "react-scroll-to-top";
import SignInPage from "./components/UserProfile/SignInPage";
import AboutUs from "./components/VibelyTeam/AboutUs";
import Test from "./components/Test";
import UnderConstruction from "./components/GeneralComponents/UnderConstruction";
import AllEventsList from "./components/Categories/EventPages/AllEventsList";

function App() {
  return (
    <div className="App">
      <ScrollToTop style={{borderRadius: "50%"}}/>
      <Header />

      <Container className="mainContainer">
        <Routes>       
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/test" element={<Test />} />
          <Route path="/tc" element={<UnderConstruction />} />
          <Route path="/allevents" element={<AllEventsList />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

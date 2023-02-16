
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Explore from "./components/Explore";
import Instructions from "./components/Instructions";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <div className="App ">
      <Header />
      <Container>
        <Routes>       
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/instructions" element={<Instructions />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

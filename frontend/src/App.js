import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Explore from "./components/Explore";
import Instructions from "./components/Instructions";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App ">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/instructions" element={<Instructions />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

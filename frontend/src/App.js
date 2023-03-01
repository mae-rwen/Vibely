import Header from "./components/GeneralComponents/Header";
import { Routes, Route } from "react-router-dom";
import Categories from "./components/Categories/Categories";
import Instructions from "./components/Instructions/Instructions";
import Footer from "./components/GeneralComponents/Footer";
import HomePage from "./components/HomePage/HomePage";
import ScrollToTop from "react-scroll-to-top";
import AboutUs from "./components/VibelyTeam/AboutUs";
import WrongPath from "./components/GeneralComponents/WrongPath";
import Layout from "./components/GeneralComponents/Layout";
import LogInForm from "./components/UserProfile/LogInForm";
import RegisterForm from "./components/UserProfile/RegisterForm";
import RequireAuth from "./RequireAuth";
import UnderConstruction from "./components/GeneralComponents/UnderConstruction";
import AllEventsList from "./components/EventPages/AllEventsList";
import CreateEvent from "./components/EventPages/CreateEvent";
import Event from "./components/EventPages/Event";
import EventSuccess from "./components/EventPages/EventSuccess";
function App() {

  return (
    <div className="App">
      <ScrollToTop style={{ borderRadius: "50%" }} />
      <Header />
      <Routes>        
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LogInForm />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/tc" element={<UnderConstruction />} />
          <Route path="/allevents/" element={<AllEventsList />} />
          <Route path="/allevents/:category" element={<AllEventsList />} />
          <Route path="/create_event" element={<CreateEvent />} />
          <Route path="/event/:event_id" element={<Event />} /> {/* move to protected routes  after completed and to /:event_id */}
          <Route path="/event_success" element={<EventSuccess />} />
          <Route path="/allevents/event" element={<Event />} />{" "}

          {/* protected routes */}
          {/* profile, edit events, edit profile, join events, single event page? */}
          <Route element={<RequireAuth />}>
            {/* <Route path="/categories" element={<Categories />} /> */}
            {/* <Route path="/create_event" element={<CreateEvent />} /> */}
          </Route>
          {/* catch all - to create missing element */}
          <Route path="*" element={<WrongPath />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

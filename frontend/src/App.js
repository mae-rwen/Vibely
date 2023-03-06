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
import SingleUser from "./components/UserProfile/SingleUser";
import AllEventsList from "./components/EventPages/DisplayAllEvents/AllEventsList";
import CreateEvent from "./components/EventPages/CreateEvent";
import Event from "./components/EventPages/Event";
import EventSuccess from "./components/EventPages/HelpersComponents/EventSuccess";
import Joined from "./components/UserProfile/BookedEvents/Joined";
import EventsDisplay from "./components/UserProfile/BookedEvents/EventsDisplay";
import EventJoined from "./components/EventPages/EventJoined";
import NavigateToLogin from "./components/GeneralComponents/NavigateToLogin";
import LoggedOut from "./components/UserProfile/HelpersComponents/LoggedOut";
import LoggedIn from "./components/UserProfile/HelpersComponents/LoggedIn";
import Registered from "./components/UserProfile/HelpersComponents/Registered";


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
          <Route path="/users/profile" element={<SingleUser />} />
          <Route path="/event_success" element={<EventSuccess />} />
          <Route path="/profile/joined" element={<Joined />} />
          <Route path="/profile/events" element={<EventsDisplay />} />
          <Route path="/event/:event_id" element={<Event />} />
          <Route path="/event_joined" element={<EventJoined />} />
          <Route path="/reqLogin" element={<NavigateToLogin />} />
          <Route path="/loggedOut" element={<LoggedOut />} />
          <Route path="/loggedIn" element={<LoggedIn />} />
          <Route path="/registered" element={<Registered />} />

          {/* protected routes */}
          {/* profile, edit events, edit profile, join events, single event page? */}
          <Route element={<RequireAuth />}>        
          {/* <Route path="/users/profile" element={<SingleUser />} /> */}
            {/* <Route path="/event/:event_id" element={<Event />} /> */}
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

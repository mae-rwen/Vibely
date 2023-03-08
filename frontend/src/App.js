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
import EventJoined from "./components/EventPages/HelpersComponents/EventJoined";
import EventEdit from "./components/EventPages/EventEdit";
import LoggedOut from "./components/UserProfile/HelpersComponents/LoggedOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventDeleted from "./components/EventPages/HelpersComponents/DeleteEvent";


function App() {
  return (
    <div className="App">
      <ScrollToTop style={{ borderRadius: "50%" }} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LogInForm />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/categoriesfe" element={<Categories />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/tc" element={<UnderConstruction />} />
          <Route path="/allevents/" element={<AllEventsList />} />
          <Route path="/allevents/:category" element={<AllEventsList />} />    
          <Route path="/loggedOut" element={<LoggedOut />} />

          {/* protected routes */}
          {/* profile, edit events, edit profile, join events, single event page? */}
         <Route element={<RequireAuth />}>           
            <Route path="/event/:event_id" element={<Event />} />
            <Route path="/create_event" element={<CreateEvent />} />
            <Route path="/profile" element={<SingleUser />} />
            <Route path="/event_joined" element={<EventJoined />} />
            <Route path="/event/edit/:id" element={<EventEdit />} />
            <Route path="/event_delete" element={<EventDeleted />} />
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

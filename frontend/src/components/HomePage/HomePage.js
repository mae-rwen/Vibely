import HeroSection from "./HeroSection";
import Introduction from "./Introduction";
import MeetTheTeam from "./MeetTheTeam";
import CategoriesOverview from "./CategoriesOverview";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import LoggedInView from "./LoggedInView";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      
      {user ? (
        <>
        <LoggedInView categories={categories} isLoaded={isLoaded} user={user}/>
        
        </>
      ) : (
        <>
        <HeroSection />
      <hr id="introduction" className="featurette-divider" />
          <Introduction />
          <hr className="featurette-divider" />
          <CategoriesOverview categories={categories} isLoaded={isLoaded} />
      
        </>
      )}
      
      <hr className="featurette-divider" />
      <MeetTheTeam />
      <hr className="featurette-divider" />
    </>
  );
}

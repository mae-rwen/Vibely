import HeroSection from "./HeroSection";
import Introduction from "./Introduction";
import MeetTheTeam from "./MeetTheTeam";
import CategoriesOverview from "./CategoriesOverview";
import { useEffect, useState } from 'react';
import axios from '../../api/axios';

export default function HomePage() {
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
      <HeroSection />
      <hr id="introduction" className="featurette-divider" />      
      <Introduction />
      <hr className="featurette-divider" />
      <CategoriesOverview categories={categories} isLoaded={isLoaded}/>     
      <hr className="featurette-divider" />
      <MeetTheTeam />
      <hr className="featurette-divider" />
    </>
  );
}


import { useEffect, useState } from 'react';
import SingleCard from './SingleCard';
import axios from "axios";
import LoadingSpinner from '../GeneralComponents/LoadingSpinner';

export default function Categories() {

  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/categories/`)
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
    <div className="categoriesHeader">
            <h1 className="display-6 fw-bold text-center">Explore all categories</h1>
            <div className="col-lg-8 mx-auto text-end">
                <p>There are XX events happening in your location during the next 2 weeks</p>
                <p><a href="#">Click here</a> to change your location. *To change the time scope, browse category of your choice.</p>
            </div>
        </div>
        {isLoaded 
        ? (
          <SingleCard categories={categories}/>
        ) 
        : (
          <LoadingSpinner />
        )}
    
    </>
  )
}

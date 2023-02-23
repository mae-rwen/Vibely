import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import LoadingSpinner from "../GeneralComponents/LoadingSpinner";
import axios from "../../api/axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="subpageHeader">
        <h2 className="fw-bold col-lg-8 mx-auto text-start">
          Explore all categories
        </h2>
        <div className="col-lg-8 mx-auto text-end">
          <p>
            There are XX events happening in your location during the next 2
            weeks
          </p>
          <p>
            You can change your location in <a href="#">your account</a>. *To
            change the time scope, browse category of your choice.
          </p>
        </div>
      </div>
      {isLoaded ? <SingleCard categories={categories} /> : <LoadingSpinner />}
    </>
  );
}

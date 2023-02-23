import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import EventsList from "./EventsList";
import EventListFilters from "./EventListFilters";

export default function AllEventsList() {
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
    
  useEffect(() => {
    axios
      .get(`/events?location=${locationQuery}`)
      .then((response) => {        
        setEvents(response.data);        
        setIsLoaded(true);           
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const location = [...new Set(events.map((event) => event.general_location))];
  // console.log(location); 
  // console.log(locationQuery);

  return (
    <>
    <div className="subpageHeader">
        <h2 className="fw-bold col-lg-8 mx-auto text-start">
          All events... in the chosen category
        </h2>
        <div className="col-lg-8 mx-auto text-end">
          <p>
          Elit pariatur Lorem et cupidatat reprehenderit aliqua anim aliqua
            nisi.
          </p>
        </div>
      </div>
    
      {isLoaded ? (
        <div className="eventsDiv">
          <EventListFilters location={location} locationQuery={locationQuery} setLocationQuery={setLocationQuery}/>
          <EventsList events={events} />          
        </div>
      ) : (
        <LoadingSpinner />
      )}
      
    </>
  );
}

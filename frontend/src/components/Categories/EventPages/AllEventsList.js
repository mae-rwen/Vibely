import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import EventsList from "./EventsList";
import EventListFilters from "./EventListFilters";

export default function AllEventsList() {
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`/events/`)
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
  const filterByLocation = (arg) => {
    const newEvents = events.filter((value) => {
      return value.general_location === arg;
    });
    setEvents(newEvents);
  };

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
          <EventListFilters events={events} setEvents={setEvents} location={location} filterByLocation={filterByLocation}/>
          <EventsList events={events} />          
        </div>
      ) : (
        <LoadingSpinner />
      )}
      
    </>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import EventsList from "./EventsList";
import Filtering from "./Filtering";

export default function AllEventsList() {
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/events/`)
      .then((response) => {
        setEvents(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="eventsHeader">
        <div className="partOne">
          <h3 className=" fw-bold text-start">{`Events around <<chosen category name>>`}</h3>
          <p className="text-end">
            Elit pariatur Lorem et cupidatat reprehenderit aliqua anim aliqua
            nisi.
          </p>
        </div>
        <div className="partTwo">
          <Button variant="secondary">Create new event</Button>
        </div>
      </div>
      {isLoaded ? (
        <div className="eventsLists">
          <EventsList events={events} />
          <Filtering />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

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
        console.log(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="eventsHeader">
        <h3 className=" fw-bold text-start">{`Events around <<chosen category name>>`}</h3>
        <div className="col-lg-8 mx-auto text-start">
          <p>
            Elit pariatur Lorem et cupidatat reprehenderit aliqua anim aliqua
            nisi.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-end mb-4">
            <Button variant="secondary">Create new event</Button>
          </div>
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

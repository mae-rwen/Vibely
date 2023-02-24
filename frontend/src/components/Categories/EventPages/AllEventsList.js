import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import EventsList from "./EventsList";
import EventListFilters from "./EventListFilters";

export default function AllEventsList() {
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");

  useEffect(() => {
    axios
      .get(`/categories`)
      .then((response) => {
        setGetCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/events`)
      .then((response) => {
        setAllEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [events]);

  const location = [
    ...new Set(allEvents.map((event) => event.general_location)),
  ];
  const types = [...new Set(allEvents.map((event) => event.type))];

  useEffect(() => {
    axios
      .get(
        `/events?location=${locationQuery}&type=${typeQuery}&category=${categoryQuery}`
      )
      .then((response) => {
        setEvents(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [locationQuery, typeQuery, categoryQuery]);

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
          <EventListFilters
            location={location}
            types={types}
            getCategories={getCategories}
            setLocationQuery={setLocationQuery}
            setTypeQuery={setTypeQuery}
            setCategoryQuery={setCategoryQuery}
          />
          <EventsList events={events} getCategories={getCategories} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

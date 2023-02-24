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
  }, []);

  const location = [
    ...new Set(allEvents.map((event) => event.general_location)),
  ];
  const types = [...new Set(allEvents.map((event) => event.type))];
  const categories = [
    ...new Set(getCategories.map((category) => category.name)),
  ];

  useEffect(() => {
    axios
      .get(`/events?location=${locationQuery}&type=${typeQuery}`)
      .then((response) => {
        setEvents(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [locationQuery, typeQuery]);

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
          <EventListFilters
            location={location}
            types={types}
            categories={categories}
            setLocationQuery={setLocationQuery}
            setTypeQuery={setTypeQuery}
          />
          <EventsList events={events} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

import axios from "../../api/axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../GeneralComponents/LoadingSpinner";
import EventsList from "./EventsList";
import EventListFilters from "./EventListFilters";
import { useParams } from "react-router-dom";

export default function AllEventsList() {
  const { category } = useParams();

  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState(category);
  const [sortBy, setSortBy] = useState("createdAt");

  // get all categories
  // and events for displaying locations and types of events
  useEffect(() => {
    axios
      .get(`/categories`)
      .then((response) => {
        setGetCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`/events`)
      .then((response) => {
        setAllEvents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const location = [
    ...new Set(allEvents.map((event) => event.general_location)),
  ];
  const types = [...new Set(allEvents.map((event) => event.type))];

  useEffect(() => {
    axios
      .get(
        `/events?location=${locationQuery}&type=${typeQuery}&category=${
          categoryQuery ? categoryQuery : ""
        }&sortBy=${sortBy}`
      )
      .then((response) => {
        setEvents(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [locationQuery, typeQuery, categoryQuery, sortBy]);

  return (
    <>
      <div className="subpageHeader">
        <h2 className="fw-bold col-lg-8 mx-auto text-start">
          {categoryQuery
            ? `Explore events for ${
                getCategories.find((value) => {
                  return value._id === categoryQuery;
                })?.name
              }`
            : "Explore all events"}
        </h2>
        <div className="col-lg-8 mx-auto text-center">
          <p>Use the filters to select events of your interest.</p>
        </div>
      </div>

      {isLoaded ? (
        <div className="eventsDiv">
          <EventListFilters
            location={location}
            types={types}
            getCategories={getCategories}
            locationQuery={locationQuery}
            setLocationQuery={setLocationQuery}
            typeQuery={typeQuery}
            setTypeQuery={setTypeQuery}
            categoryQuery={categoryQuery}
            setCategoryQuery={setCategoryQuery}
            setSortBy={setSortBy}
          />

          <EventsList events={events} getCategories={getCategories} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

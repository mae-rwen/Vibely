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

// get the categories
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

//get all events for displaying locations and types of events
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

  useEffect(() => {
    axios
      .get(
        `/events?location=${locationQuery}&type=${typeQuery}&category=${categoryQuery?(categoryQuery):("")}`
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
          {categoryQuery ? (
            `Explore events for ${getCategories.map((value) => {
              if (value._id === categoryQuery) {
               return value.name          
              }
            })}` 
          ):("Explore all events")}       
        </h2>
        <div className="col-lg-8 mx-auto text-center">
          <p>
            Use the filters to select events of your interest.
          </p>
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
          />       
                
          <EventsList events={events} getCategories={getCategories} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
      </>)}

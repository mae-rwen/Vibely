import axios from "../../../api/axios";
import { useEffect, useState, useContext } from "react";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import EventsList from "./EventsList";
import EventListFilters from "./EventListFilters";
import { useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

export default function AllEventsList() {
  const { category } = useParams();
  const { user } = useContext(AuthContext);

  const [allEvents, setAllEvents] = useState([]);
  const [eventsToDisplay, setEventsToDisplay] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState(category);
  const [sortBy, setSortBy] = useState("createdAt");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const handlePrevious = () => {
    setCurrentPage((prev) => {
      if (prev === 1) return currentPage;
      return currentPage - 1;
    });
  };
  const handleNext = () => {
    setCurrentPage((prev) => {
      if (prev === pageCount) return prev;
      return prev + 1;
    });
  };

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
        setAllEvents(response.data.allEvents);
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
        }&sortBy=${sortBy}&page=${currentPage}`
      )
      .then((response) => {
        setEventsToDisplay(response.data.events);
        setPageCount(response.data.pagination.pageCount);       

        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [locationQuery, typeQuery, categoryQuery, sortBy, currentPage]);

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
            eventsToDisplay={eventsToDisplay}
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
          {eventsToDisplay.length !== 0 ? (
            <>
              <ListGroup className="eventsList" as="ul">
                {eventsToDisplay.map((event) => {
                  
                  return (
                    <EventsList
                      key={event._id}
                      event={event}
                      user={user}
                      getCategories={getCategories}
                    />
                  );
                })}
              </ListGroup>
              <div className=" d-flex flex-direction-row justify-content-center mt-3 gap-3">
                <Button
                  disabled={currentPage === 1}
                  onClick={handlePrevious}
                  className="w-30 mt-3"
                  variant="warning"
                  type="submit"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentPage === pageCount}
                  className="w-30 mt-3"
                  variant="warning"
                  type="submit"
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            "No matching events. Please try out with different filters."
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}

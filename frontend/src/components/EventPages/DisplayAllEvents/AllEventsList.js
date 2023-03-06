import axios from "../../../api/axios";
import { useEffect, useState, useContext } from "react";
import LoadingSpinner from "../../GeneralComponents/LoadingSpinner";
import EventsList from "./EventsList";
import EventListFilters from "./EventListFilters";
import { useParams, useNavigate } from "react-router-dom";
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
  console.log("befror set" + currentPage);
  const handlePrevious = () => {
    // setCurrentPage((prev) => {
    //   if (prev === 1) return currentPage;
    //   return currentPage - 1;
    // });

    setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    // setCurrentPage((prev) => {
    //   if (prev === pageCount) return prev;
    //   return prev + 1;
    // });
    setCurrentPage(currentPage + 1);
  };
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
      .get(`/events?page=${currentPage}`)
      .then((response) => {
        // setAllEvents(response.data);//commeting to check
        console.log(currentPage);
        setAllEvents(response.data.events);
        setPageCount(response.data.pagination.pageCount);
        console.log(
          "page count from bbackend" + response.data.pagination.pageCount
        );
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
        if (user) {
          //adding .events to check
          setEventsToDisplay(
            response?.data?.events.filter(
              (event) => event.author?._id !== user?._id
            )
          );
          setCurrentPage(response.data.pagination.pageCount);
        } else {
          setEventsToDisplay(response.data.events);
        }

        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [locationQuery, typeQuery, categoryQuery, sortBy]);
  console.log(pageCount + "backend");
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
          {eventsToDisplay.length !== 0 ? (
            <ListGroup className="eventsList" as="ul">
              {eventsToDisplay.map((event) => {
                return (
                  <EventsList
                    key={event._id}
                    event={event}
                    getCategories={getCategories}
                  />
                );
              })}
            </ListGroup>
          ) : (
            "No matching events. Please try out with different filters."
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
      <div className=" d-flex flex-direction-row justify-content-center mt-3 gap-3">
        <Button
          disabled={currentPage === 1}
          onClick={handlePrevious}
          className="w-30 mt-3"
          variant="secondary"
          type="submit"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentPage === pageCount}
          className="w-30 mt-3"
          variant="secondary"
          type="submit"
        >
          Next
        </Button>
      </div>
    </>
  );
}

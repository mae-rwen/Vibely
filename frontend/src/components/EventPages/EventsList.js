import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink } from "react-router-dom";

export default function EventsList({ event }) {
 
  const date = new Date(event.date);
  const year = date.getFullYear();
  const day = date.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekday = days[date.getDay()];
  const formattedDate =
    weekday && day && month && year
      ? `${weekday}, ${day} ${month} ${year}`
      : null;

  // get the time
  const hour = date.getHours().toString();
  const minutes = date.getMinutes().toString();

  const formattedTime =
    hour && minutes ? `${hour}:${minutes}` : null; 
  return (
    <>
      <NavLink
        to={`/event/${event._id}`}
        style={{ textDecoration: "none" }}        
      >
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <span>
              <b>{event.title}</b> in {event.general_location} <br /> on{" "}
              {formattedDate ? formattedDate : `not specified date`} at{" "}
              {formattedTime ? formattedTime : `not specified time`} <br />{" "}
              searching for{" "}
              {event.participants
                ? event.participants
                : "not specified number of"}{" "}
              people <br />
              Created by {event.author?.name ? event.author?.name : "unknown"}
              <br />
              Category:{" "}
              {event.category?.name ? event.category?.name : "undefined"}
            </span>
          </div>
          <Badge bg="secondary" pill>
            already joined: {event.joined}
          </Badge>
        </ListGroup.Item>
      </NavLink>
    </>
  );
}

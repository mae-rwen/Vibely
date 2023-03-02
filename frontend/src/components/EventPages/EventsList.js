import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink } from "react-router-dom";

export default function EventsList({ events, getCategories }) {
  return (
    <>
      {events.length !== 0 ? (
        <ListGroup className="eventsList" as="ul">
          {events.map((event) => {
            // console.log(event.date)
            // get the date
            const date = new Date(event.date);
            console.log(date.toTimeString())
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
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const weekday = days[date.getDay()];
            const formattedDate =
              weekday && day && month && year
                ? `${weekday}, ${day} ${month} ${year}`
                : null;

            // get the time
            const hour = date.getHours().toString();
            const minutes = date.getMinutes().toString();
            // console.log(typeof hour)
            // console.log(typeof minutes)
            const formattedTime = hour && minutes ? `${hour}:${minutes}` : null;

          

            return (
              <NavLink
                to={`/event/${event._id}`}
                style={{ textDecoration: "none" }}
                key={event._id}
              >
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <span>
                      <b>{event.title}</b> in {event.general_location} <br /> on{" "}
                      <br/>
                      {event.date}<br/>
                      {formattedDate ? formattedDate : `not specified date`} at{" "}
                      {formattedTime ? formattedTime : `not specified time`}{" "}
                      <br /> searching for{" "}
                      {event.participants
                        ? event.participants
                        : "not specified number of"}{" "}
                      people <br />
                      Created by{" "}
                      {event.author?.name ? event.author?.name : "unknown"}
                      <br />
                      Category:{" "}
                      {event.category?.name
                        ? event.category?.name
                        : "undefined"}
                    </span>
                  </div>
                  <Badge bg="secondary" pill>
                    already joined: 2
                  </Badge>
                </ListGroup.Item>
              </NavLink>
            );
          })}
        </ListGroup>
      ) : (
        "No matching events. Please try out with different filters."
      )}
    </>
  );
}

import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink } from "react-router-dom";
import Figure from "react-bootstrap/Figure";
import Card from "react-bootstrap/Card";

export default function EventsList({ event, getCategories, user }) {
  // get the date
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
    hour && minutes
      ? `${hour.length === 2 ? hour : "0" + hour}:${
          minutes.length === 2 ? minutes : "0" + minutes
        }`
      : null;

  // get description preview
  const truncatedDescription = event.description.substring(0, 100);

  const isJoined = event.attenders?.filter(
    (joined) => joined.user === user?._id
  );

  return (
    <>
      <NavLink to={`/event/${event._id}`} style={{ textDecoration: "none" }}>
        <ListGroup.Item as="li">
          <Figure id="eventThumbnail">
            <Figure.Image
              alt="category"
              src={event.category?.picture}
              thumbnail
            />
            <h5>
              <Badge bg="secondary" pill id="thumbnailBadge">
                joined: {event.joined < event.participants ? event.joined : "event full"}
                {event.participants ? `/${event.participants}` : null}
              </Badge>
            </h5>
            <Figure.Caption>
              Category:{" "}
              {event.category?.name ? event.category?.name : "undefined"}
            </Figure.Caption>
          </Figure>
          <div className="eventDescription">
            <span>
            {isJoined?.length > 0 ? (
                  <>
                    <h6>
                      <Badge bg="secondary" pill id="thumbnailBadge">
                        You've joined this event
                      </Badge>
                    </h6>
                  </>
                ) : null}
              <h5 className="fw-bold">{event.title}</h5>
              <p>                
                {event.description.length > 100
                  ? `${truncatedDescription}...`
                  : truncatedDescription}
              </p>
            </span>
          </div>
         
            <ListGroup variant="flush" id="eventData">
              <ListGroup.Item>
                in <b>{event.general_location}</b>
              </ListGroup.Item>
              <ListGroup.Item>
                on {formattedDate ? formattedDate : `not specified date`} at{" "}
                {formattedTime ? formattedTime : `not specified time`}
              </ListGroup.Item>
              <ListGroup.Item>
                Created by{" "}
                <b>{event.author?.name ? event.author?.name : "unknown"}</b>
              </ListGroup.Item>
            </ListGroup>
     
        </ListGroup.Item>
      </NavLink>
    </>
  );
}

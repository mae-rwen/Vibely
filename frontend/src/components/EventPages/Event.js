import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import {
  Button,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  faBuildingColumns,
  faClock,
  faCalendarDays,
  faHouseChimney,
  faLocationCrosshairs,
  faMessage,
  faQuestionCircle,
  faAdd,
  faEye,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth"
import "./event.css";

const Event = () => {

  const { user } = useAuth();
  console.log(user)

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const { event_id } = useParams();

  const [event, setEvent] = useState({});
  const [join, setJoin] = useState({});
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    axios
      .get(`/events/find/${event_id}`)
      .then((response) => {
        // console.log("found:", response.data);
        setEvent(response.data);
      })
      .catch((err) => {
        setEvent(null);
      });
  }, []);

  // console.log(user);

  const type = event?.type;
  //  console.log(type)

 const joinEvent = (e) => {
    e.preventDefault();
      axios.post(`/booking/${event_id}`)
      .then((response)=> {
        console.log("joined", response.data);
        setBooked(true)
        // setJoin(response.data)
      })
      .catch((err) => {
        setEvent(null);
      }, []);
    }

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
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekday = days[date.getDay()];
    const formattedDate = weekday && day && month && year ? `${weekday}, ${day} ${month} ${year}` : null;


    // get the time
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = hour && minutes ? `${hour}:${minutes}` : null;




  const renderTooltip = (props) => (
    <Tooltip id="tooltip" {...props}></Tooltip>
  );

  return (
    <>
      {event && (
        <Card>
          <Card.Header className="d-flex">
            <Card.Title className="title my-3">{event.title}</Card.Title>
            <Button
              className="ms-auto my-3"
              //   size="sm"
              variant="secondary"
              onClick={goBack}
            >
              Go Back
            </Button>
          </Card.Header>

          <Card.Body>
            <div className="mx-3">
              <Row className="ms-auto gap-5"></Row>
              <Row className="justify-content-end">
                Category: {event.category?.name}
              </Row>
              <Row>
                <Col className="p-1 mx-3 my-2">
                    <Card.Title>
                      Hosted by: { event.author?.name }
                    </Card.Title>
                    <Card.Subtitle>
                      <p>
                        <FontAwesomeIcon
                          icon={faLocationCrosshairs}
                          size="xs"
                        />{" "}
                        Location: {event.general_location}
                      </p>
                      </Card.Subtitle>
                    <hr />
                    <div>
                    <span className="text mb-0">
                      <FontAwesomeIcon icon={faCalendarDays} size="xs" />{" "}
                      {formattedDate}
                    </span>
                    <span className="text mb-0">
                    <FontAwesomeIcon icon={faClock} size="xs" /> {formattedTime}{" "}
                    </span>
                    <div className="mx-2">
                      <span className={type === "private" ? "show" : "hide"}>
                        <FontAwesomeIcon icon={faHouseChimney} size="xs" />
                      </span>
                      <span className={type === "public" ? "show" : "hide"}>
                        <FontAwesomeIcon icon={faBuildingColumns} size="xs" />
                      </span>
                    </div>
                    <span className="text mb-0 first-letter">{event.type}</span>
                    </div>
                </Col>
                <Col></Col>
              </Row>

              <Row>
                <Col className="mx-2 my-3 about">
                  <h5>About Event</h5>
                  <Card.Text>{event.description}</Card.Text>
                  <Row className="justify-content-end">
                    <div>
                      <p> max participants: {event.participants}</p>
                      <p>already joining: </p>
                    </div>
                  </Row>
                </Col>
              </Row>
              <p className="my-2">
                <FontAwesomeIcon icon={faInfo} size="sm" />
              </p>
              <Row></Row>
            </div>
          </Card.Body>

          <Card.Footer className="d-flex justify-content-end display-content-end gap-3">
            {/* <OverlayTrigger
              placement="top-end"
              overlay={
                <Tooltip id="button-tooltip-2">Add to your Watch List</Tooltip>
              }
            >
              {({ ref, ...triggerHandler }) => (
                <Button
                  ref={ref}
                  variant="outline-secondary"
                  {...triggerHandler}
                  className="d-inline-flex align-items-center"
                >
                  {" "}
                  <FontAwesomeIcon
                    style={{ position: "relative" }}
                    icon={faEye}
                    size="xl"
                  />
                  <div className="absolute_add">
                    <FontAwesomeIcon icon={faAdd} size="sm" />
                  </div>
                </Button>
              )}
            </OverlayTrigger> */}

            <OverlayTrigger
              placement="top-end"
              overlay={<Tooltip id="button-tooltip-2">Contact</Tooltip>}
            >
              {({ ref, ...triggerHandler }) => (
                <Button
                  ref={ref}
                  variant="outline-secondary"
                  alt="add to your watch list"
                  {...triggerHandler}
                  className="d-inline-flex align-items-center"
                >
                  {" "}
                  <FontAwesomeIcon
                    style={{ position: "relative" }}
                    icon={faMessage}
                    size="xl"
                  />
                  <div className="absolute">
                    <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
                  </div>
                </Button>
              )}
            </OverlayTrigger>

            <Button variant="secondary" disabled={booked} onClick={joinEvent}>
              JOIN
            </Button>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default Event;

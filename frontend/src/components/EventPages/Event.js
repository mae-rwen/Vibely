import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import {
  Button,
  Row,
  Col,
  Card,
  Container,
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
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import "./event.css";

const Event = () => {

  const { user, setUser, joined, created, allEvents, booked } = useAuth();
  const { event_id } = useParams();

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [err, setErr] = useState("");
  const [event, setEvent] = useState({});
  const [join, setJoin] = useState(false);

  const [userData, setUserData] = useState("");
  const [updatedEvent, setUpdatedEvent] = useState({});

  console.log(joined);
  console.log(created);
  console.log(booked);
  console.log(allEvents);

  useEffect(() => {
    axios
      .get(`/events/find/${event_id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        console.log(err.message);
        setEvent(null);
      });
  }, [event_id]);

  // console.log(user);

  const type = event?.type;

  const joinEvent = (e) => {
    e.preventDefault();
    axios
      .post(`/booking/${event_id}`)
      .then((response) => {
        console.log("joined", response.data);
        setJoin(true);
        navigate("/event_joined");

      })
      .catch((err) => {
        if (!err?.response) {
          setErr("No Server Response");
        } else if (err.response?.status === 409) {
          setErr("You already joined this event");
        } else {
          setEvent(null);
        }
      }, []);
  };

  // const renderTooltip = (props) => (
  //   <Tooltip id="tooltip" {...props}></Tooltip>
  // );

  const date = new Date(event.date);
  const UTC = date.toUTCString();
  console.log(UTC);
  return (
    <Container>
      <Button className="ms-end my-3" variant="secondary" onClick={goBack}>
        Go Back
      </Button>
      {event && (
        <Card>
          <Card.Header className="d-flex">
            <Row>
              <Col>
                <Card.Title className="event">{event.title}</Card.Title>

                <Card.Subtitle className="subtitle">
                  <span>
                    <FontAwesomeIcon icon={faCalendarDays} /> {UTC}
                  </span>
                </Card.Subtitle>
              </Col>
            </Row>
          </Card.Header>

          <Card.Body>
            <div className="mx-3">
              <Row className="ms-auto gap-5"></Row>
              <Row className="justify-content-end">
                Category: {event.category?.name}
              </Row>
              <Row>
                <Col className="p-1 mx-3 my-2">
                  <Card.Title>Hosted by: {event.author?.name}</Card.Title>
                  <Card.Subtitle>
                    <p>
                      <FontAwesomeIcon icon={faLocationCrosshairs} size="xs" />{" "}
                      Location: {event.general_location}
                    </p>
                  </Card.Subtitle>
                  <hr />
                  <div>
                    <span className="text mb-0">
                      <FontAwesomeIcon icon={faCalendarDays} size="xs" /> {UTC}
                    </span>
                    {/* <span className="text mb-0">
                      <FontAwesomeIcon icon={faClock} size="xs" /> here time{" "}
                    </span> */}
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

            <Button variant="secondary" disabled={join} onClick={joinEvent}>
              JOIN
            </Button>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
};

export default Event;

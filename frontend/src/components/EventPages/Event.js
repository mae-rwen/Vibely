import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import {
  Button,
  Row,
  Col,
  Card,
  Container,
  OverlayTrigger,
  Tooltip,
  Figure,
  Badge,
  Modal,
} from "react-bootstrap";

import { useNavigate, useParams, Navigate } from "react-router-dom";

import {
  faBuildingColumns,
  faClock,
  faCalendarDays,
  faHouseChimney,
  faLocationCrosshairs,
  faMessage,
  faQuestionCircle,
  faInfo,
  faUsers,
  faArrowLeft,
  faRightToBracket,
  faPenToSquare,
  faTrash,
  faShareFromSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/AuthProvider";
import "./event.css";
import Avatar from "react-avatar";
import DeleteEvent from "./HelpersComponents/DeleteEvent";

const Event = () => {
  const { auth, user, setJoined, setUser, joined, created, allEvents, booked } =
    useContext(AuthContext);
  const { event_id } = useParams();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const goEdit = () => navigate(`/event/edit/${event_id}`);
  const joinSucc = () => navigate(`/event_joined`);

  const [err, setErr] = useState("");
  const [event, setEvent] = useState({});
  const [join, setJoin] = useState(false);

  const [userData, setUserData] = useState("");
  const [updatedEvent, setUpdatedEvent] = useState({});

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

  const type = event?.type;

  const joinEvent = (e) => {
    e.preventDefault();
    axios
      .post(`/booking/${event_id}`)
      .then((response) => {
        console.log("joined", response.data);
        setJoin(true);
        const joining = response.data;
        navigate(`/event_joined`, { replace: true });
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

  const isAuthor = user._id === event?.author?._id;
  console.log(isAuthor);

  const isJoined = event.attenders?.filter(
    (joined) => joined.user === user._id
  );
  // const check = isJoined(element => element.isJoined === true)

  console.log(isJoined?.length);
  // console.log(Join)

  const deleteEvent = async () => {
    const response = await axios.delete(`/events/find/${event_id}`)
        console.log("deleted successfully!");
        navigate("/event_delete")
  }

  if (show) {
    return (
      <>
        <Modal
          onClose={() => setShow(false)}
          size="sm"
          show={setShow}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="modal-sizes-title-sm">Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you really want to delete this event?. This process cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-end gap-3">
              <Button
                onClick={() => setShow(false)}
                variant="outline-secondary"
              >
                Cancel
              </Button>
              <Button onClick={(e) => deleteEvent()} variant="danger">
                Delete
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Card>
        <Card.Header id="singeEventCardHeader">
          <Button variant="primary" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>

          <span id="cardHeader">
            <span id="eventTitleWBadge">
              <h4 className="fw-bold">{event.title}</h4>
              {isJoined?.length > 0 ? (
                <Badge bg="secondary" pill>
                  Joined!
                </Badge>
              ) : null}
            </span>

            <Card.Subtitle id="eventDescSubt">
              <p>
                <FontAwesomeIcon icon={faCalendarDays} />{" "}
                {formattedDate ? formattedDate : `not specified date`} at{" "}
                {formattedTime ? formattedTime : `not specified time`}
              </p>
              <p>
                <FontAwesomeIcon icon={faLocationCrosshairs} /> in{" "}
                {event.general_location}
              </p>
              {event.type === "private" ? (
                <p>
                  <FontAwesomeIcon icon={faHouseChimney} /> private event
                </p>
              ) : (
                <p>
                  <FontAwesomeIcon icon={faBuildingColumns} /> public event
                </p>
              )}
              <p>
                <FontAwesomeIcon icon={faUsers} />{" "}
                {event.joined < event.participants
                  ? event.participants
                    ? `${event.joined}/${event.participants}`
                    : null
                  : `event full (${event.participants})`}
              </p>
            </Card.Subtitle>
          </span>
          <Figure id="singleEventThumbnail">
            <Figure.Image
              alt="category"
              src={event.category?.picture}
              thumbnail
            />
            <Figure.Caption>
              Category:{" "}
              {event.category?.name ? event.category?.name : "undefined"}
            </Figure.Caption>
          </Figure>
        </Card.Header>

        <Card.Body>
          <Card.Text id="eventDesc">
            <Avatar
              size="40"
              round={true}
              src={event.author?.picture}
              name={event.author?.name}
            />{" "}
            <h6 className="fw-bold">Hosted by {event.author?.name}</h6>
          </Card.Text>

         
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
          
        </Card.Body>
        <Card.Footer id="eventDescBtns">
          {/* edit button */}
          {isAuthor === true ? (
            <>
              <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                <Button variant="warning" onClick={goEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
              </OverlayTrigger>
            </>
          ) : null}

          {/* Delete button */}
          {isAuthor === true ? (
            <>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <Button variant="outline-warning">
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              </OverlayTrigger>
            </>
          ) : null}

          {/* JOIN button */}
          {isAuthor === true ||
          isJoined?.length > 0 ||
          event?.joined >= event.participants ? null : (
            <>
              <OverlayTrigger placement="top" overlay={<Tooltip>Join</Tooltip>}>
                <Button variant="warning" onClick={joinEvent}>
                  <FontAwesomeIcon icon={faRightToBracket} />
                </Button>
              </OverlayTrigger>
            </>
          )}

          {/* UNjoin button */}
          {isAuthor === true ? null : (
            <>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Leave</Tooltip>}
              >
                <Button variant="outline-warning">
                  <FontAwesomeIcon icon={faShareFromSquare} />
                </Button>
              </OverlayTrigger>
              
                <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="tooltip-leave">Delete the event</Tooltip>}
              >
                <Button onClick={() => setShow(true)} variant="outline-warning">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </OverlayTrigger>
              
            </>
          )}
        </Card.Footer>
      </Card>

      <br />
      <hr className="featurette-divider" />
      <br />
      {/* old version */}
      <Container>
        <div className="btn_event">
          <Button className="ms-end my-3" variant="secondary" onClick={goBack}>
            Go Back
          </Button>

          {isAuthor === true ? (
            <Button
              className="ms-end my-3"
              variant="secondary"
              onClick={goEdit}
            >
              Edit
            </Button>
          ) : null}
        </div>
        {event && (
          <Card>
            <Card.Header className="">
              {isJoined?.length > 0 ? (
                <Badge bg="secondary" pill id="thumbnailBadge">
                  you already joined this event
                </Badge>
              ) : null}
              <Row className="justify-content-space-between mx-2">
                <Col sm={9}>
                  <Card.Title className="event">{event.title}</Card.Title>
                  <Card.Subtitle className="subtitle mb-2">
                    <span>
                      <FontAwesomeIcon icon={faCalendarDays} />{" "}
                      {formattedDate ? formattedDate : `not specified date`} at{" "}
                      {formattedTime ? formattedTime : `not specified time`}
                    </span>
                  </Card.Subtitle>
                  <Card.Subtitle className="subtitle2">
                    <p>
                      <FontAwesomeIcon icon={faLocationCrosshairs} size="xs" />{" "}
                      Location: {event.general_location}
                    </p>
                  </Card.Subtitle>
                </Col>
                <Col sm={3} className="ms-end category_event">
                  <Figure>
                    <Figure.Image
                      thumbnail
                      width={120}
                      rounded={true}
                      alt={event.category?.name}
                      src={event.category?.picture}
                    />
                    <Figure.Caption>{event.category?.name}</Figure.Caption>
                  </Figure>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              <div className="mx-3">
                <Row className="ms-auto gap-5"></Row>
                <Row className="justify-content-end"></Row>
                <Row className="my-4">
                  <Col sm={1}>
                    <Avatar
                      size="50"
                      round={true}
                      src={event.author?.picture}
                      name={event.author?.name}
                    />
                  </Col>
                  <Col sm={4} className="justify-content-end">
                    <Card.Title>Host: {event.author?.name}</Card.Title>
                    <hr />
                  </Col>
                  <Col></Col>
                </Row>

                <Row className="my-4">
                  <Col className="mx-2 my-3 about">
                    <div className="mb-4">
                      <div className="mx-2">
                        <span className={type === "private" ? "show" : "hide"}>
                          <FontAwesomeIcon icon={faHouseChimney} />
                        </span>
                        <span className={type === "public" ? "show" : "hide"}>
                          <FontAwesomeIcon icon={faBuildingColumns} />
                        </span>
                      </div>
                      <span className="text mb-0 first-letter">
                        {event.type}
                      </span>
                    </div>
                    <Row className="mt-2 my-2">
                      <div
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      />
                    </Row>

                    <Row className="mt-4 my-2">
                      <div>
                        <h5>
                          <Badge bg="dark" pill id="thumbnailBadge">
                            joined: {event.joined}
                            {event.participants
                              ? `/${event.participants}`
                              : null}
                          </Badge>
                        </h5>
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
                    {/* <div className="absolute">
                    <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
                  </div> */}
                  </Button>
                )}
              </OverlayTrigger>
              {isAuthor === true ||
              isJoined?.length > 0 ||
              event?.joined >= event.participants ? null : (
                <Button variant="secondary" onClick={joinEvent}>
                  JOIN
                </Button>
              )}
            </Card.Footer>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Event;

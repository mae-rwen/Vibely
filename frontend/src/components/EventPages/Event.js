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
  const date = new Date(event?.date);

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

  const isJoined = event?.attenders?.filter(
    (joined) => joined.user === user._id
  );
  // const check = isJoined(element => element.isJoined === true)

  console.log(isJoined?.length);
  // console.log(Join)

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteEvent = async () => {
    const response = await axios.delete(`/events/find/${event_id}`);
    console.log("deleted successfully!");
    navigate("/event_delete");
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Do you really want to delete this event? This process cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={() => deleteEvent()} variant="danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
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
              <h4 className="fw-bold">{event?.title}</h4>
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
                {event?.general_location}
              </p>
              {event?.type === "private" ? (
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
                {event?.joined < event?.participants
                  ? event.participants
                    ? `${event?.joined}/${event?.participants}`
                    : null
                  : `event full (${event?.participants})`}
              </p>
            </Card.Subtitle>
          </span>
          <Figure id="singleEventThumbnail">
            <Figure.Image
              alt="category"
              src={event?.category?.picture}
              thumbnail
            />
            <Figure.Caption>
              Category:{" "}
              {event?.category?.name ? event?.category?.name : "undefined"}
            </Figure.Caption>
          </Figure>
        </Card.Header>

        <Card.Body>
          <Card.Text id="eventDesc">
            <Avatar
              size="40"
              round={true}
              src={event?.author?.picture}
              name={event?.author?.name}
            />{" "}
            <h6 className="fw-bold">Hosted by {event?.author?.name}</h6>
          </Card.Text>
          <Card.Text id="actualDesc">
            <div dangerouslySetInnerHTML={{ __html: event?.description }} />
          </Card.Text>
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
                <Button onClick={() => setShow(true)} variant="outline-warning">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </OverlayTrigger>

              <MyVerticallyCenteredModal
                show={show}
                onHide={() => setShow(false)}
              />
            </>
          ) : null}

          {/* JOIN button */}
          {isAuthor === true ||
          isJoined?.length > 0 ||
          event?.joined >= event?.participants ? null : (
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
            </>
          )}
        </Card.Footer>
      </Card>

      <br />
      <hr className="featurette-divider" />
      <br />
      {/* old version */}
    </>
  );
};

export default Event;

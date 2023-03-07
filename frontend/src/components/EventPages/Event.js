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
} from "react-bootstrap";
import { useNavigate, useParams, Navigate} from "react-router-dom";
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
import { AuthContext } from "../../context/AuthProvider";
import "./event.css";
import Avatar from "react-avatar";

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

  // const renderTooltip = (props) => (
  //   <Tooltip id="tooltip" {...props}></Tooltip>
  // );

  const date = new Date(event.date);
  const UTC = date.toUTCString();

  const isAuthor = user._id === event?.author?._id;
  console.log(isAuthor);

  const isJoined = event.attenders?.filter(
    (joined) => joined.user === user._id
  );
  // const check = isJoined(element => element.isJoined === true)

  console.log(isJoined?.length);
  // console.log(Join)

  return (
    <Container>
      <div className="btn_event">
        <Button className="ms-end my-3" variant="secondary" onClick={goBack}>
          Go Back
        </Button>
        {isAuthor === true ? (
          <Button className="ms-end my-3" variant="secondary" onClick={goEdit}>
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
                    <FontAwesomeIcon icon={faCalendarDays} /> {UTC}
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
                        <FontAwesomeIcon icon={faHouseChimney}/>
                      </span>
                      <span className={type === "public" ? "show" : "hide"}>
                        <FontAwesomeIcon icon={faBuildingColumns} />
                      </span>
                    </div>
                    <span className="text mb-0 first-letter">{event.type}</span>
                  </div>
                  <Row className="mt-2 my-2">
                    <Card.Text>{event.description}</Card.Text>
                  </Row>

                  <Row className="mt-4 my-2">
                    <div>
                      <h5>
                        <Badge bg="dark" pill id="thumbnailBadge">
                          joined: {event.joined}
                          {event.participants ? `/${event.participants}` : null}
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
            {isAuthor === true || isJoined?.length > 0 || event?.joined >= event.participants ? null : (
              <>
              
              <Button variant="secondary" onClick={joinEvent}>
                JOIN
              </Button>
              </>
              
            )}
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
};

export default Event;

import React, { useEffect, useContext, useState } from "react";
import axios from "../../api/axios";
import {
  Button,
  Alert,
  Container,
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
  faFontAwesomeIcon,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/AuthProvider";
import "./event.css";

const Event = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const { event_id } = useParams();

  const [event, setEvent] = useState({});

  useEffect(() => {
    axios
      .get(`/events/${event_id}`)
      .then((response) => {
        console.log("found:", response.data);
        setEvent(response.data);
      })
      .catch((err) => {
        setEvent(null);
      });
  }, []);

  console.log(user);

     const type = event.type
     console.log(type)


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}></Tooltip>
  );

  return (
    <div>
      <h5>Hej {user?.name}! nice to see you</h5>
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
            <Container fluid>
              <Row className="ms-auto gap-5"></Row>
              <Row className="justify-content-end">
                Category: {event.category?.name}
              </Row>
              <Row>
                <Col className="p-1">
                  <Alert variant="outline-secondary">
                    <Alert.Heading>
                      Hosted by: {event.author?.name}
                    </Alert.Heading>
                    <p>
                      <p>
                        <FontAwesomeIcon
                          icon={faLocationCrosshairs}
                          size="xs"
                        />{" "}
                        Location: {event.general_location}
                      </p>
                    </p>
                    <hr />
                    <p className="text mb-0">
                      <FontAwesomeIcon icon={faCalendarDays} size="xs" />{" "}
                      {event.date} <br />
                      <FontAwesomeIcon icon={faClock} size="xs" /> here time{" "}
                      <br />
                    </p>
                    <div className="mx-2">
                    <span className={type==="private" ? "show" : "hide"}>
                     <FontAwesomeIcon icon={faHouseChimney} size="xs" />
                    </span> 
                    <span className={type==="public" ? "show" : "hide"} >
                    <FontAwesomeIcon
                        icon={faBuildingColumns}
                        size="xs"
                      /> 
                    </span>
                    </div>
                    <p className="text mb-0">{event.type}</p>
                  </Alert>
                </Col>
                <Col></Col>
              </Row>

              <Row>
                <Card>
                  <Card.Title>
                    <h4>
                       About Event
                    </h4>
                  </Card.Title>
                  <Card.Text>{event.description}</Card.Text>
                  <Row className="justify-content-end">
                    <Card.Text>
                      <p> max participants: {event.participants}</p>
                      <p>already joining: </p>
                    </Card.Text>
                  </Row>
                </Card>
              </Row>
              <p className="my-2"><FontAwesomeIcon icon={faInfo} size="sm" /></p>
              <Row></Row>
            </Container>
          </Card.Body>

          <Card.Footer className="d-flex justify-content-end display-content-end gap-2">
            <OverlayTrigger
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
            </OverlayTrigger>

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

            <Button variant="secondary">JOIN</Button>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default Event;

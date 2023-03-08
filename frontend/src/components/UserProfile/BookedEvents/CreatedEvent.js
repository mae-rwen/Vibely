import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ListGroup, ListGroupItem, Badge } from "react-bootstrap";

import "./eventdisplay.css";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axios from "../../../api/axios";
import { Modal } from "react-bootstrap";

function CreatedEvent({ events, props }) {
  const [visible, setVisible] = useState(3);
  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [eventsID, setEventsID] = useState(events);
  const navigate = useNavigate();

  const deleteEvent = async (eventsID) => {
    const response = await axios.delete(`/events/find/${eventsID}`);
  
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
            Do you really want to delete this event?. This process cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={() => deleteEvent(eventsID)} variant="danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }



  return (
    <div>
      {/* changinf to crrated */}
      {events.length !== 0 ? (
        <>
          <ListGroup as="ul">
            {events.slice(0, visible).map((val) => {
              // get the date
              const eID = val._id;
              const date = new Date(val.date);
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

              return (
                <ListGroupItem as="li" key={val._id} id="joinedItem">
                  <span id="createdEventTitle">
                    <h5 className="fw-bold mt-2 mb-3">{val.title}</h5>
                    <Badge
                      bg="secondary"
                      pill
                      id="thumbnailBadge"
                      className="mt-2"
                    >
                      Joined: {val.joined ? val.joined : "0"}/{val.participants}
                    </Badge>
                  </span>
                  <div id="underTheTitle">
                    <span id="titleAndThumbnail">
                      <Figure id="joinedThumbnail">
                        <Figure.Image
                          alt="thumbnail"
                          src={val.category?.picture}
                          thumbnail
                        />
                      </Figure>
                    </span>

                    <div id="joinedDescription">
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          {" "}
                          in {val.general_location}{" "}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          on{" "}
                          {formattedDate ? formattedDate : `not specified date`}{" "}
                          at{" "}
                          {formattedTime ? formattedTime : `not specified time`}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div id="joinedBtns">
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip id="tooltip-leave">
                                  Go to the event page
                                </Tooltip>
                              }
                            >
                              <Button
                                variant="warning"
                                href={`/event/${val._id}`}
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip id="tooltip-leave">Edit</Tooltip>
                              }
                            >
                              <Button
                                variant="primary"
                                href={`/event/edit/${val._id}`}
                              >
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip id="tooltip-leave">Delete</Tooltip>
                              }
                            >
                              <Button
                                onClick={() => {
                                  setEventsID(val._id);
                                  setShow(true);
                                }}
                                variant="outline-warning"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </OverlayTrigger>

                            <MyVerticallyCenteredModal
                              show={show}
                              onHide={() => setShow(false)}
                              key={val._id}
                            />
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-3 mt-3">
            <Button
              className="w-30 mt-3"
              variant="secondary"
              onClick={loadMore}
            >
              Load more
            </Button>
          </div>
        </>
      ) : (
        <div>
          <h6 className="display-8 fw-bold">
            You haven't created any events yet
          </h6>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-start">
            <Button variant="outline-warning" href="/create_event">
              Create new event
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatedEvent;

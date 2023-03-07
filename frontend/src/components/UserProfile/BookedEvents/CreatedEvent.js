import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import { ListGroup, ListGroupItem, Row, Col, Card } from "react-bootstrap";
import "./eventdisplay.css";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";
import {
  faShareFromSquare,
  faEye,
  faPenToSquare,
  faXmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axios from "../../../api/axios";
import { Modal } from "react-bootstrap";

function CreatedEvent({ events }) {
  const { created } = useContext(AuthContext);
  console.log(events);
  const [visible, setVisible] = useState(3);
  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };

  const [show, setShow] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();
    await axios.delete(`/find/:id`);
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
              <Button onClick={(e) => handleDelete()} variant="danger">
                Delete
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <div>
      {events.length !== 0 ? (
        <>
          <ListGroup as="ul">
            {events.slice(0, visible).map((val) => {
              // get the date
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
                  <h5 className="fw-bold mt-2 mb-3">{val.title}</h5>
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
                            <NavLink
                              to={`/event/${val._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                  <Tooltip id="tooltip-leave">
                                    Go to the event page
                                  </Tooltip>
                                }
                              >
                                <Button variant="outline-warning">
                                  <FontAwesomeIcon icon={faEye} />
                                </Button>
                              </OverlayTrigger>
                            </NavLink>

                            <NavLink
                              to={`/event/edit/${val._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                  <Tooltip id="tooltip-leave">
                                    Edit the event
                                  </Tooltip>
                                }
                              >
                                <Button variant="outline-warning">
                                  <FontAwesomeIcon icon={faPenToSquare} />
                                </Button>
                              </OverlayTrigger>
                            </NavLink>

                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip id="tooltip-leave">
                                  Delete the event
                                </Tooltip>
                              }
                            >
                              <Button
                                onClick={() => setShow(true)}
                                variant="outline-warning"
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </OverlayTrigger>
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

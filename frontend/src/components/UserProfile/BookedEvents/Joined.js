import React, { useContext, useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import AuthContext from "../../../context/AuthProvider";
import { ListGroupItem, Row, Col } from "react-bootstrap";
import axios from "../../../api/axios";
import "./eventdisplay.css";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";
import Card from "react-bootstrap/Card";
import Vibely from "./../Vibely.png";

function Joined() {
  const { joined, allEvents, user, booking } = useContext(AuthContext);
  const [visible, setVisible] = useState(3);
  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };
  // const [joined, setJoined] = useState({})

  console.log(joined);
  // console.log(user);
  // console.log(booking);

  // console.log(allEvents);
  // console.log(user._id);

  return (
    <div>
      {joined?.length !== 0 ? (
        <>
          <ListGroup as="ul">
            {joined.slice(0, visible).map((val) => {
              // get the date
              const date = new Date(val.event?.date);
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
                  <h5 className="fw-bold mt-2 mb-3">{val.event?.title}</h5>
                  <span>
                    <Figure id="joinedThumbnail">
                      <Figure.Image alt="thumbnail" src={Vibely} thumbnail />
                    </Figure>

                    <div className="joinedDescription">
                      <Card id="joinedData">
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            {" "}
                            in {val.event?.general_location}{" "}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            on{" "}
                            {formattedDate
                              ? formattedDate
                              : `not specified date`}{" "}
                            at{" "}
                            {formattedTime
                              ? formattedTime
                              : `not specified time`}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Created by{" "}
                            <b>
                              {val.event?.author?.name
                                ? val.event?.author?.name
                                : "unknown"}
                            </b>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </div>
                    <div>
                      <Button variant="secondary">Leave the event</Button>
                      <Button variant="secondary">Go to the event</Button>
                    </div>
                  </span>
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
        "You haven't joined any Events yet"
      )}
    </div>
  );
}

export default Joined;

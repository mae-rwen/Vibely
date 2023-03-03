import React, { useContext, useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import AuthContext from "../../../context/AuthProvider";
import { ListGroupItem, Row, Col } from "react-bootstrap";
import axios from "../../../api/axios";
import "./eventdisplay.css"

function Joined() {
  const { joined, allEvents, user, booking } = useContext(AuthContext);

  // const [joined, setJoined] = useState({})

  console.log(joined);
  console.log(user);
  console.log(booking);

  console.log(allEvents);
  console.log(user._id);


  return (
    <div>
      {joined?.length !== 0
        ? (
          <ListGroup as="ul">
            {joined.map((val) => {
              const date = new Date(val.event?.date);
              const UTC = date.toUTCString();

              return(
                <ListGroupItem as="li" key={val._id}>
                  <Row>
                    <Col>
                    <p>{val.event.general_location}</p>
                    Picture of Event?
                    </Col>
                    <Col>
                    <p className="event_title">{val.event.title}</p>
                    <p>{UTC}</p>
                    <p>in: {val.event.general_location}</p>
                    </Col>

                    <Col>
                    <p>functions like delete</p>
                    <p>maybe kontakt author?</p>
                    <p>or go to event</p>
                 
                    </Col>
            
                  </Row>
                </ListGroupItem>
              )
            })}
          </ListGroup>
          ):(
          "You haven't joined any Events yet"
          )}
    </div>
  );
}

export default Joined;

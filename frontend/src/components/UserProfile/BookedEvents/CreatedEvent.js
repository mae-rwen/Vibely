import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";
import { ListGroup, ListGroupItem, Row, Col, Card } from "react-bootstrap";
import "./eventdisplay.css";
import Button from "react-bootstrap/Button";

function CreatedEvent({ events }) {
  const { created } = useContext(AuthContext);
  console.log(events);
  const [visible, setVisible] = useState(3);
  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };
  return (
    <div>
      {events.length !== 0 ? (
        <ListGroup as="ul">
          {events.slice(0, visible).map((val) => {
            console.log(val);
            const date = new Date(val.date);
            const UTC = date.toUTCString();

            return (
              <>
                <NavLink
                  to={`/event/${val._id}`}
                  style={{ textDecoration: "none" }}
                ></NavLink>
                <ListGroupItem as="li" key={val._id}>
                  <Row>
                    <Col>
                      <Card
                        className="bg-dark text-dark"
                        style={{ width: "12rem" }}
                      >
                        <Card.Img
                          variant="top"
                          src={val.category.picture}
                          alt="outdoor activities image"
                        />
                        <Card.ImgOverlay>
                          <Card.Title>{val.category.name}</Card.Title>
                        </Card.ImgOverlay>
                      </Card>
                    </Col>
                    <Col>
                      <p className="event_title">{val.title}</p>
                      <p>{UTC}</p>
                      <p>in: {val.general_location}</p>
                    </Col>

                    <Col>
                      <Row>
                        <p>functions like delete?</p>
                      </Row>
                      <Row>
                        <NavLink
                          to={`/event/edit/${val._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          Edit
                        </NavLink>
                        <br />
                      </Row>
                      <Row>
                        <NavLink
                          to={`/event/${val._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          Go to Event
                        </NavLink>
                      </Row>
                    </Col>
                  </Row>
                </ListGroupItem>
              </>
            );
          })}
        </ListGroup>
      ) : (
        "You haven't created any Events yet"
      )}
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-3 mt-3">
        <Button className="w-30 mt-3" variant="secondary" onClick={loadMore}>
          Load more
        </Button>
      </div>
    </div>
  );
}

export default CreatedEvent;

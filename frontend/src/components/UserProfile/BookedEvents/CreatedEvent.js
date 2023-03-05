import React, { useContext, useEffect, useState } from "react";
import axios from "../../../api/axios";
import AuthContext from "../../../context/AuthProvider";
import { ListGroup, ListGroupItem, Row, Col, Card } from "react-bootstrap";
import "./eventdisplay.css";
import Button from "react-bootstrap/Button";

function CreatedEvent() {
  const { created } = useContext(AuthContext);
  console.log(created);
  const [visible, setVisible] = useState(3);
  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };
  return (
    <div>
      {created.length !== 0 ? (
        <ListGroup as="ul">
          {created.slice(0, visible).map((val) => {
            const date = new Date(val.date);
            const UTC = date.toUTCString();

            return (
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
                    <p>functions like delete</p>
                    <p>edit event</p>
                    <p>or go to event</p>
                  </Col>
                </Row>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      ) : (
        "You haven't created any Events yet"
      )}
      <Button className="w-30 mt-3" variant="secondary" onClick={loadMore}>
        Load more
      </Button>
    </div>
  );
}

export default CreatedEvent;

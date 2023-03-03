import React, { useContext, useEffect } from "react";
import axios from "../../../api/axios";
import AuthContext from "../../../context/AuthProvider";
import { ListGroup, ListGroupItem, Row, Col, Card } from "react-bootstrap";
import "./eventdisplay.css";

function CreatedEvent() {
  const { created, setCreated } = useContext(AuthContext);
  console.log(created);
  // const [created, setCreated] = useState([]);

  useEffect(() => {
   axios.get(`/events?user._id`).then((response) => {
          console.log(response.data)
          setCreated(response.data);
        })
        .catch((err) => {
        console.log(err)
       })
      }, []);


  return (
    <div>
      {created.length !== 0 ? (
        <ListGroup as="ul">
          {created.map((val) => {
            const date = new Date(val.date);
            const UTC = date.toUTCString();

            return (
              <ListGroupItem as="li" key={val._id}>
                <Row>
                  <Col>
                    <Card className="bg-dark text-dark" style={{ width: "12rem" }}>
                      <Card.Img variant="top" src={val.category.picture} alt="outdoor activities image"/>
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
    </div>
  );
}

export default CreatedEvent;

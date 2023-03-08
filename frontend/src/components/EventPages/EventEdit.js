import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./event.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editor from "../../context/Editor";

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [event, setEvent] = useState({});

  const [title, setTitle] = useState();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState("");
  const [description, setDescription] = useState("");
  const [eventPic, setEventPic] = useState("");
  const [files, setFiles] = useState("");
  const [category, setCategory] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    axios.get(`/events/find/${id}`).then((response) => {
     
      const data = response.data;
      setTitle(data.title);
      setLocation(data.general_location);
      setType(data.type);
      setDate(data.date);
      setCategory(data.category);
      setDescription(data.description);
      setParticipants(data.participants);
    });
  }, []);

  const updatedEvent = {
    title: title,
    general_location: location,
    description: description,
    category: category,
    date: date,
    type: type,
    participants: Number(participants),
  };

  async function updateEvent(e) {
    e.preventDefault();
    await axios
      .put(`/events/find/${id}`, updatedEvent)
      .then((response) => {
        setEvent({
          title: title,
          general_location: location,
          description: description,
          category: category,
          date: date,
          type: type,
          participants: Number(participants),
          id: id,
        });
      })
      .catch((error) => console.log(error));
    setIsClicked(true);
    toast(`You've successfully updated the event! `, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      setIsClicked(false);
      navigate(`/event/${id}`);
    }, 2000);
  }

  return (
    <Card className="createEvent">
      <Card.Body>
        <Button className="ms-end my-3" variant="primary" onClick={goBack}>
          Cancel
        </Button>
        <Form onSubmit={updateEvent}>
          <Form.Group className="mb-3">
            <Form.Text muted>Title</Form.Text>
            <Form.Control
              type="Title"
              placeholder={title}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Text muted>Number of Participants: {participants}</Form.Text>
            <Form.Control
              type="number"
              min="1"
              name="participants"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form className="mb-3">
                <Form.Text muted>
                  Event: {type.toLocaleUpperCase()}, select to change
                </Form.Text>
                <Form.Check
                  label="Private"
                  name="group1"
                  type="radio"
                  value="private"
                  onChange={(e) => setType(e.target.value)}
                />
                <Form.Check
                  label="Public"
                  name="group1"
                  type="radio"
                  value="public"
                  onChange={(e) => setType(e.target.value)}
                />
              </Form>
            </Col>

            <Col>
              <Form.Group>
                <Form.Text muted>
                  Date & Time: {date} select to change
                </Form.Text>
                <div className="form-check">
                  <input
                    type="datetime-local"
                    name="event-datetime"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Editor
            value={description}
            onChange={(newValue) => setDescription(newValue)}
          />

          {isClicked ? (
            <Button className="mb-3 mx-1 my-3" variant="secondary">
              <Spinner animation="border" size="sm" />
            </Button>
          ) : (
            <Button
              className="mb-3 mx-1 my-3"
              variant="secondary"
              type="submit"
            >
              Update
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

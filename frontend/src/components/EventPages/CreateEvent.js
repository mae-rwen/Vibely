import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./createEvents.css";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventParticipants, setEventParticipants] = useState(0);
  const [eventDescription, setEventDescription] = useState("");
  const event = {
    title: eventName,
    general_location: eventLocation,
    type: eventType,
    date: eventDate,
    category: eventCategory,
    participants: eventParticipants,
    description: eventDescription,
  };
  useEffect(() => {
    axios.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(event);
    axios.post("/events", event).then((response) => {
      console.log(response.data);
    }).catch((error) => console.log(error));

    setEventCategory("");
    setEventDate("");
    setEventDescription("");
    setEventName("");
    setEventLocation("");
    setEventParticipants("");
    setEventType("");
    navigate("/event_success");
  };
  return (
    <div className="event-form d-flex flex-column gap-4">
      <h4 className="text-center">Create an Event</h4>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Name of the event</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Location"
            required
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type of the Event</Form.Label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="public"
              onChange={(e) => setEventType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Public
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="private"
              onChange={(e) => setEventType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Private
            </label>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date and Time</Form.Label>
          {/* <input
            type="date"
            id="start"
            name="event-start"
            onChange={(e) => setEventDate(e.target.value)}
          /> */}
          <input
            type="datetime-local"
            name="event-datetime"
            required
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setEventCategory(e.target.value);
            }}
            required
          >
            <option>Choose a category</option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of participants (minimum: 4) </Form.Label>
          <Form.Control
            type="number"
            min="4"
            name="participants"
            value={eventParticipants}
            onChange={(e) => setEventParticipants(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

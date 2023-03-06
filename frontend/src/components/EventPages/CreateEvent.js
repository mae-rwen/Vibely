import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import CitySelector from "./CitySelector";

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
    if (event.category === "" || event.general_location === "") {
      console.log("not added");
      navigate("/event_failed");
    } else {
      console.log(event);
      axios
        .post("/events", event)
        .then((response) => {
          // console.log(response.data);
        })
        .catch((error) => console.log(error));
      navigate("/event_success");
    }
    setEventCategory("");
    setEventDate("");
    setEventDescription("");
    setEventName("");
    setEventLocation("");
    setEventParticipants("");
    setEventType("");
  };
  return (
    <Card className="createEvent">
      <Card.Body>
        <Card.Title className="my-4 text-center fw-bold">
          Create an activity to share with others
        </Card.Title>

        <Form className="createEventForm" onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Name of the event</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name of the event"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </Form.Group>
          <div className="locationAndType">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Location of the event</Form.Label>
              <CitySelector setEventLocation={setEventLocation} />
              <Form.Text muted>
                Select the desired location from the list
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Type</Form.Label>
              <div className="radioButtons">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="public"
                    required
                    onChange={(e) => setEventType(e.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    public
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
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    private
                  </label>
                </div>
              </div>
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Date and time</Form.Label>
            <div className="form-check">
              <input
                type="datetime-local"
                name="event-datetime"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setEventCategory(e.target.value);
              }}
              required
              // defaultValue={"DEFAULT"}
            >
              <option value=" ">Choose a category</option>
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
            <Form.Label className="fw-bold">
              Number of participants (minimum: 1){" "}
            </Form.Label>
            <Form.Control
              type="number"
              min="1"
              name="participants"
              value={eventParticipants}
              required
              onChange={(e) => setEventParticipants(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Write something about this activity"
              rows={3}
              required
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button className="w-30 mt-3" variant="secondary" type="submit">
              Create this event
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

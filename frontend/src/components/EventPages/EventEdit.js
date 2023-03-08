import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import {
  Form,
  InputGroup,
  Container,
  Button,
  Row,
  Col,
  Card,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  faBuildingColumns,
  faClock,
  faCalendarDays,
  faHouseChimney,
  faLocationCrosshairs,
  faMessage,
  faQuestionCircle,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../hooks/useAuth";
import "./event.css";
import { AuthContext } from "../../context/AuthProvider";
import CitySelector from "./HelpersComponents/CitySelector";
import { ToastContainer, toast } from "react-toastify";
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
      console.log(response.data);
      //   setEvent(response.data);
      const data = response.data;
      //   const dat = new Date(data.date);
      //   const ISO = dat.toISOString;
      setTitle(data.title);
      setLocation(data.general_location);
      setType(data.type);
      setDate(data.date);
      setCategory(data.category);
      setDescription(data.description);
      setParticipants(data.participants);
    });
  }, []);

  useEffect(() => {
    console.log("Event", event);
  });

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
    // const data = new FormData();
    // data.set("title", title);
    // data.set("location", location);
    // data.set("description", description);
    // data.set("category", category);
    // data.set("date", date);
    // data.set("type", type);
    // data.set("participants", participants);
    // console.log(data);
    //        data.set('file', files);
    await axios
      .put(`/events/find/${id}`, updatedEvent)
      .then((response) => {
        // setEvent({body: data});
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
      // Perform login logic here and redirect to another page
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

          {/* <Form.Group className="mb-3">
          <Form.Text muted>
            Location: {location}, select from list to change
          </Form.Text>
          <CitySelector
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Select location from the list"
          />
        </Form.Group> */}

          {/* <Form.Select
              aria-label="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              required
            >
              {{category}.map((cat, index) => {
                return (
                  <option key={index} value={cat._id}>
                    {cat.name}
                  </option>
                );
              })}
            </Form.Select> */}

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

          {/* <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Multiple files input example</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
      </Form.Group> */}

          <Editor
            value={description}
            onChange={(newValue) => setDescription(newValue)}
          />

          {isClicked ? (
            <Button
              className="mb-3 mx-1 my-3"
              variant="secondary"              
            >
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

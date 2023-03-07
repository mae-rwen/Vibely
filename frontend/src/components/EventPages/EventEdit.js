import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { Form, InputGroup, Container, Button } from "react-bootstrap";
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

  useEffect(() => {
    axios.get(`/events/find/${id}`).then((response) => {
    console.log(response.data);
    setEvent(response.data);
    const data = response.data;
      setTitle(data.title);
      setLocation(data.general_location);
      setType(data.type);
      setDate(data.date);
      setDescription(data.description);
      setParticipants(data.participants);
    //   console.log(event);
    });
  }, []);

  useEffect(() => {
    console.log("title", title);
    console.log("Event", event);
});


  async function updateEvent(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("location", location);
    data.set("description", description);
    data.set("category", category);
    data.set("date", date);
    data.set("type", type);
    data.set("participants", participants);
    console.log(data);
//        data.set('file', files);
    const response = await axios.put(`/events/find/${id}`, event).then((response) => {
        // setEvent({body: data});
        setEvent({
            "title": title,
            "general_location": location,
            "description": description,
            "category": category,
            "date": date,
            "type": type,
            "participants": participants,
        });
    });
    };
  

  return (
    <Container>
    <Form onSubmit={updateEvent}>
         <Button className="ms-end my-3" variant="secondary" onClick={goBack}>
          Cancel
        </Button>
      <InputGroup className="mb-3 mx-2">
        {/* <InputGroup.Text>Title</InputGroup.Text> */}
        <Form.Control
          type="text"
          placeholder={title}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
        }}
        />
      </InputGroup>

      {/* <Form.Select
              aria-label="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              required
            >
              {category.map((cat, index) => {
                return (
                  <option key={index} value={cat._id}>
                    {cat.name}
                  </option>
                );
              })}
            </Form.Select> */}

      <Form.Group>
        {/* <Form.Label>Number of participants (minimum: 4) </Form.Label> */}
        <Form.Text muted>Number of Participants</Form.Text>
        <Form.Control
          type="number"
          min="4"
          name="participants"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
        
      </Form.Group>

      {/* <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Location of the event</Form.Label>
        <Form.Text muted>Location, select from list</Form.Text>
        <CitySelector
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Select location from the list"
        />
        
      </Form.Group> */}
      
      <Form.Select>
      <InputGroup.Text>Type</InputGroup.Text>
        <option disabled>type: {type} select to change</option>
        <option value="Private">Private</option>
        <option value="Public">Public</option>
      </Form.Select>

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

      <Button variant="secondary" type="submit">Update Event</Button>
    </Form>
    </Container>
  );
}

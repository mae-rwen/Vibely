import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { Form, InputGroup, FloatingLabel, Button } from "react-bootstrap";
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

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants ] = useState("")
  const [description, setDescription] = useState("");
  const [eventPic, setEventPic] = useState("");
  const [files, setFiles] = useState("");
  const [category, setCategory] = useState("");
  const [updatedEvent, setUpdatedEvent] = useState("");

  useEffect(() => {
    axios.get(`/events/find/${id}`).then((response) => {
        const event = response.data;
        setTitle(event.title);
        setLocation(event.general_location);
        setType(event.type);
        setDate(event.date);
        setDescription(event.description);
        setParticipants(event.participants);
      console.log(event);

    });
  }, []);

  async function updateEvent(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set('general_location', location);
    data.set('description', description);
    data.set('category', category);
    data.set('date', date);
    data.set('type', type);
    data.set('participants', participants);
    data.set('id', id)
//        data.set('file', files);
    await axios.put(`/events/find/${id}`, {body: data}).then((response) => {
        console.log(response.data)
    })
       
  }

  return (
    <Form onSubmit={updateEvent}>
      <InputGroup className="mb-3">
        <InputGroup.Text>Title</InputGroup.Text>
        <Form.Control
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

        <Form.Group >
            <Form.Label>
              Number of participants (minimum: 4){" "}
            </Form.Label>
            <Form.Control
              type="number"
              min="4"
              name="participants"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Location of the event</Form.Label>
        <CitySelector
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Select location from the list"
        />
        <Form.Text muted>Select the desired location from the list</Form.Text>
      </Form.Group>

      <Form.Select aria-label="Default select example">
        <option disabled>type: {type} select to change</option>
        <option value="Private">Private</option>
        <option value="Public">Public</option>
      </Form.Select>

      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Multiple files input example</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
      </Form.Group>

      <Editor value={description} onChange={newValue => setDescription(newValue)}  />

      <Button variant="secondary" type="submit">Update Event</Button>
    </Form>
  );
}

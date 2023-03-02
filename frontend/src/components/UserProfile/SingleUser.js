import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./SingleUser.css";
import Table from "react-bootstrap/Table";
import { useEffect, useContext, useState } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthProvider";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";

export default function SingleUser() {
  const { user } = useContext(AuthContext);
  //to show and hide the modal
  const [show, setShow] = useState(false);
  //logged in user info
  const [userP, setUserP] = useState({});
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userImage, setUserImage] = useState("");
  //state for events of logged in user
  const [events, setEvents] = useState([]);
  //for pagination in events
  const [visible, setVisible] = useState(3);
  const length = events.length;

  useEffect(() => {
    axios.get(`/users/profile`).then((response) => {
      setUserP(response.data);
      setUserName(response.data?.name);
      setUserEmail(response.data?.email);
      setUserDescription(response?.data.description);
      setUserLocation(response.data?.location);
      axios.get(`/events?user=${response.data._id}`).then((response) => {
        setEvents(response.data);
      });
    });
  }, []);

  const userProfile = {
    email: userEmail,
    description: userDescription,
    name: userName,
    location: userLocation,
  };

  const submitHandler = (e) => {
    e.preventDefault();

    //testing by removing userprofile
    axios.put(`/users/${user._id}`, userProfile).then((response) => {
      setUserP({
        email: response.data?.email,
        description: response.data?.description,
        name: response.data?.name,
        location: response.data?.location,
        // profilePic: response.data?.profilePic,
      });
      console.log(response.data);
    });
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const loadMore = () => {
    setVisible((prev) => prev + 3);
  };

  // const uploadImage = (e) => {
  //   setUserImage(e.target.files[0]);
  // };
  return (
    <>
      <div className="userProfileDiv">
        <Card id="userDesc">
          <Card.Img
            variant="top"
            src="https://media.istockphoto.com/id/1372144488/de/foto/niedliche-katze-mit-blumenkrone-mit-blauen-bl%C3%BCten-auf-kopfportr%C3%A4t.jpg?s=612x612&w=0&k=20&c=NedGT3gmxz3HE9PneCi8nhaZrz7L7srQ5Li-qibG_y8="
          />
          <Card.Body>
            <Card.Title className="text-center fw-bold">
              {userP.name}
            </Card.Title>
            <Card.Text>From: location</Card.Text>
            <Card.Text>
              Excepteur ad dolore ullamco dolor reprehenderit officia ipsum
              adipisicing incididunt commodo deserunt eiusmod.
            </Card.Text>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-3">
              <Button
                className="w-30 mt-3"
                variant="secondary"
                onClick={handleShow}
              >
                Edit profile
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Card id="userEvents">
          <Card.Body>
            <Card.Title className="fw-bold mb-4">My activities</Card.Title>
            <Card.Text>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Event Date</th>
                    <th>Event Time</th>
                    <th>Event Location</th>
                  </tr>
                </thead>
                <tbody>
                  {events.slice(0, visible).map((event, index) => {
                    return (
                      <tr key={index}>
                        <td>{event.title}</td>
                        <td>{event.date}</td>
                        <td>{event.date}</td>
                        <td>{event.general_location}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-3">
                <Button
                  className="w-30 mt-3"
                  variant="secondary"
                  onClick={loadMore}
                >
                  Load more
                </Button>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Modal className="mt-4" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                // required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={userEmail}
                name="email"
                onChange={(e) => setUserEmail(e.target.value)}
                // required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location"
                // required
                value={userLocation}
                name="location"
                onChange={(e) => setUserLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Something about you</Form.Label>
              <FloatingLabel controlId="floatingTextarea2">
                <Form.Control
                  as="textarea"
                  placeholder="About me"
                  style={{ height: "100px" }}
                  value={userDescription}
                  name="description"
                  onChange={(e) => setUserDescription(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            {/* <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload profile picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="profileImage"
                    onChange={uploadImage}
                  />
                </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={submitHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

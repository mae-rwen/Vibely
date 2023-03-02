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
      <Card style={{ width: "20em" }}>
        <Card.Img
          style={{
            width: "250px",
            borderRadius: "50%",
            aspectRatio: "0",
            margin: "auto",
            marginTop: "2em",
          }}
          variant="top"
          src="https://media.istockphoto.com/id/1372144488/de/foto/niedliche-katze-mit-blumenkrone-mit-blauen-bl%C3%BCten-auf-kopfportr%C3%A4t.jpg?s=612x612&w=0&k=20&c=NedGT3gmxz3HE9PneCi8nhaZrz7L7srQ5Li-qibG_y8="
        />
        <Card.Body>
          <Card.Title className="text-center fw-bold">{userP.name}</Card.Title>
          <Card.Text>From: location</Card.Text>
          <Card.Text>
            About {userP.name}: Excepteur ad dolore ullamco dolor reprehenderit
            officia ipsum adipisicing incididunt commodo deserunt eiusmod.
          </Card.Text>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
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
      <Card style={{ width: '40em' }}>      
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
    
      <br />
      <br />

      <hr />
      <br />
      <br />
      <div>
        {/* <h1 className="text-center">Welcome {user.name}</h1> */}

        <div className="row">
          <div className="col-4 p-3 mx-4 personalInfo">
            <img
              className="myProfilePic"
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              alt=""
            />
            <h4>{userP.name}</h4>

            <Button variant="primary" onClick={handleShow}>
              Edit profile
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit your profile</Modal.Title>
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
                    <Form.Label>Description</Form.Label>
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
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={submitHandler}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="col ">
            <h3>About Me</h3>
            <h5 className="userDescription">{userP.description}</h5>
            <h3>Event created by me</h3>

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
            <Button variant="primary" onClick={loadMore}>
              Load more
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

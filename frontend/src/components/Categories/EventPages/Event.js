import React, { useEffect, useContext, useParams } from "react";
import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  faBuildingColumns,
  faClock,
  faCalendarDays,
  faHouseChimney,
  faLocationCrosshairs,
  faMessage,
  faQuestionCircle,
  faAdd,
  faEye,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFontAwesomeIcon,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../../context/AuthProvider";

const EVENT_URL = "/events/";

const Event = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const { allEvents, user, allUsers, eventCat } = useContext(AuthContext);
  console.log(user);
  console.log(allEvents);
  console.log(eventCat);
  console.log(allUsers);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}></Tooltip>
  );

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <p>logged in user: {user._id}</p>
      {/* { event &&  */}
      <Card body>
        <Modal.Header>
          <Modal.Title>Event title</Modal.Title>
          <Button variant="secondary" onClick={goBack}>
            Go Back
          </Button>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row className="justify-content-end">Category:</Row>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h5>Hosted by: </h5>
                  </Col>
                  <Col>
                    <h4>Author</h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h5>
                      <FontAwesomeIcon icon={faLocationCrosshairs} /> Location:
                    </h5>
                  </Col>
                  <Col> here gen_lok</Col>
                </Row>
                <Row>
                    <p>Is this place public or private? .......</p>
                  <Col>
                    <FontAwesomeIcon icon={faHouseChimney} size="xl" />
                  </Col>
                  <Col>Private</Col>
                </Row>
                <Row>
                  <Col>
                    <FontAwesomeIcon icon={faBuildingColumns} size="xl" />
                  </Col>
                  <Col>Public</Col>
                </Row>

                <FontAwesomeIcon icon={faInfo} size="sm" />
               
              </Col>
              <Col className="justify-content-end">
                <Row>
                  <FontAwesomeIcon icon={faCalendarDays} size="xl" />{" "}
                </Row>
                <Row>
                  <FontAwesomeIcon icon={faClock} size="xl" />
                </Row>
              </Col>
            </Row>
            <Row>
              <Card>
                <Card.Title>Description:</Card.Title>
                <Card.Text>
                  Description of Event With supporting text below as a natural
                  lead-in to additional content. Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Quam ut assumenda facere nemo
                  saepe aliquam corrupti nisi! A, laudantium quod eligendi
                  consequatur minus deserunt mollitia excepturi, perferendis
                  natus incidunt ea?
                  <br />
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                  optio nulla voluptatem, illum facilis architecto ratione
                  tempore culpa perspiciatis unde veritatis eius sed, iste
                  corrupti sunt laudantium impedit, vitae. <br />
                  <br />
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                  maxime illo, quidem quod eius officiis, cupiditate, magnam
                  suscipit nostrum voluptas voluptatem. Eos atque sunt quo modi
                  at, doloremque voluptates consequuntur.
                  <br />
                  <br />
                </Card.Text>
                <Row className="justify-content-end">
                <Card.Text>
                  <p>max ppl</p>
                  <p>already joining</p>
                </Card.Text>
                </Row>

              </Card>
            </Row>
            <p>Open/public</p>
            <p>Are snacks provided</p>
            <Row></Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <OverlayTrigger
            placement="top-end"
            overlay={
              <Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>
            }
          >
            {({ ref, ...triggerHandler }) => (
              <Button
                variant="outline-secondary"
                {...triggerHandler}
                className="d-inline-flex align-items-center"
              >
                {" "}
                <FontAwesomeIcon icon={faInfo} ref={ref} size="sm" />
                <span className="ms-1">Hover to see</span>
              </Button>
            )}
          </OverlayTrigger>

          <Button variant="outline-secondary">
            <FontAwesomeIcon icon={faEye} size="xl" />
            <FontAwesomeIcon icon={faAdd} size="sm" />
          </Button>
          <Button variant="outline-secondary">
            <FontAwesomeIcon icon={faMessage} size="xl" />
            <FontAwesomeIcon icon={faQuestionCircle} size="sm" />
          </Button>
          <Button variant="secondary">JOIN</Button>
        </Modal.Footer>
      </Card>
      {/* } */}
    </div>
  );
};

export default Event;

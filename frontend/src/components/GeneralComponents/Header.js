import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function Header() {
  return (
    <Navbar className="fixed-top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          Vibely
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas placement="top">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fw-bold">Vibely</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body id="navbarOffcanvas">
            <Nav className="ms-auto gap-2">
              <NavLink
                to="/"
                style={{ padding: "10px" }}
                className={({ isActive }) =>
                  isActive ? "activeClass " : "nonActive"
                }
              >
                Home
              </NavLink>
              <NavLink
                style={{ padding: "10px" }}
                to="/categories"
                className={({ isActive }) =>
                  isActive ? "activeClass " : "nonActive"
                }
              >
                Categories
              </NavLink>
              <NavLink
                style={{ padding: "10px" }}
                to="/allevents"
                className={({ isActive }) =>
                  isActive ? "activeClass " : "nonActive"
                }
              >
                All events
              </NavLink>
              <NavLink
                style={{ padding: "10px" }}
                to="/instructions"
                className={({ isActive }) =>
                  isActive ? "activeClass " : "nonActive"
                }
              >
                Instructions
              </NavLink>            
              <Form className="d-flex">
                <Button className="m-auto" href="/register" variant="outline-secondary">
                  Register
                </Button>
              </Form>
              <Form className="d-flex">
                <Button className="m-auto" href="/login" variant="outline-secondary">
                  Login
                </Button>
              </Form>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

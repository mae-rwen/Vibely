import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function Header() {
  return (
    <Navbar className="fixed-top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">Vibely</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
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
              to="/explore"
              className={({ isActive }) =>
                isActive ? "activeClass " : "nonActive"
              }
            >
              Explore
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
           <Button href="/signin" variant="outline-secondary">
              Sign In
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export default function Header() {
  const { user, logout } = useContext(AuthContext);   

  return (
    <Navbar 
    className="fixed-top" 
    // bg="light" 
    expand="lg" 
    style={{backgroundColor: "#fff"}}>
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          Vibely
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" placement="top">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id="offcanvasNavbarLabel-expand-lg"
              className="fw-bold"
            >
              Vibely
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body id="navbarOffcanvas">
            <Nav className="ms-auto gap-2">
              <NavDropdown title="All routes" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Home</NavDropdown.Item>
                <NavDropdown.Item href="/categories">
                  Categories
                </NavDropdown.Item>
                <NavDropdown.Item href="/allevents">
                  All events
                </NavDropdown.Item>
                <NavDropdown.Item href="/instructions">
                  Instructions
                </NavDropdown.Item>
                <NavDropdown.Item href="/joined">Joined</NavDropdown.Item>
                <NavDropdown.Item href="/users/profile/">
                  User profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/aboutus">About us</NavDropdown.Item>
              </NavDropdown>

              <NavLink
                to="/"
                style={{ padding: "10px" }}
                className={({ isActive }) =>
                  isActive ? "activeClass " : "nonActive"
                }
              >
                <FontAwesomeIcon icon={faHouse} />
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
                to="/instructions"
                className={({ isActive }) =>
                  isActive ? "activeClass " : "nonActive"
                }
              >
                Instructions
              </NavLink>
              <Form className="d-flex">
                {user ? (
                  <>                
                  <Button
                    className="m-auto ms-1"                 
                    href="/users/profile/"
                    variant="secondary"
                  >
                    <FontAwesomeIcon icon={faUser} /> Your profile
                  </Button>
                  <Button
                    className="m-auto ms-1"                 
                    variant="outline-secondary"
                    onClick={logout}
                  >
                    Log out
                  </Button>            
                  </>
                ) : (
                  <Button
                    className="m-auto ms-1"
                    href="/login"
                    variant="secondary"
                  >
                    Vibein
                  </Button>
                )}
              </Form>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

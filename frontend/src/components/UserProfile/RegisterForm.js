import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import image from "./Vibely.png";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTime,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faFontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function RegisterForm({ setSetAccount }) {
  const changeState = () => setSetAccount(true);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    useRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.text(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  return (
    <>
      <Card className="text-center signupCard">
        <Card.Body>
          <img
            src={image}
            alt="Logo"
            style={{ width: "100px", marginTop: "1.5em" }}
          />
          <Card.Title className="my-4">Create a new account</Card.Title>
          <Form className="signupForm">
            <Form.Group className="mb-3">
              <Form.Control type="username" placeholder="Username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Accept T&C"
                className="text-start"
              />
            </Form.Group>
            <Button variant="outline-secondary" type="submit">
              Register
            </Button>
            <Card.Text className="mt-3">
              <Form.Text className="text-muted">
                Already registered? Login{" "}
                <a href="#" style={{ color: "inherit" }} onClick={changeState}>
                  here
                </a>
              </Form.Text>
            </Card.Text>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

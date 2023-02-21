import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import image from "./Vibely.png";
import "./registerform.css";
import {
  faCheck,
  faTime,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFontAwesomeIcon,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";
// import axiosClient from "../../api/axiosClient";
import axios from "../../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._!-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL = '/auth/signup'

const RegisterForm = ({ setSetAccount }) => {
  const changeState = () => setSetAccount(true);

  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();
  // const usernameRef = useRef()

  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   useRef.current.focus();
  // }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setError("");
  }, [user, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setError("Invalid Entry");
      return;
    }
    // console.log(user, email, password);
    try {
      const response = await axios.post(SIGNUP_URL, JSON.stringify({ name: user, email, password}),
      {
        headers: { 'Content-Type': 'application/json'},
        withCredentials: true
      }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response))
      setSuccess(true);
      // clear input fields
    } catch (err) {
        if (!err?.response) {
          setError('No Server Response');
        } else if (err.response?.status === 409) {
          setError("Username or Email Taken")
        } else {
          setError('Registration Failed')
        }
        errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <Card className="signupCard">
            <Card.Body>
              <p
                ref={errRef}
                className={error ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {error}
              </p>
              {/* <img
            src={image}
            alt="Logo"
            style={{ width: "100px", marginTop: "1.5em" }}
          /> */}
              <Card.Title className="my-4 text-center">
                Create a new account
              </Card.Title>

              <Form className="text-center signupForm" onSubmit={handleSubmit}>
                {/* username */}
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                  <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <p
                    id="uidnote"
                    className={
                      userFocus && user && !validName
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <br />
                    4-24 characters. Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
                </Form.Floating>

                {/* email */}
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="email"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />
                  <label htmlFor="email">
                    Email address:
                    <span className={validEmail ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <p
                    id="emailnote"
                    className={
                      emailFocus && email && !validEmail
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <br />
                    instructions about email - to be changed. Letters, numbers,
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="underscores">_</span>{" "}
                    <span aria-label="period">.</span>{" "}
                    <span aria-label="dash">-</span>{" "}
                    <span aria-label="at symbol">@</span>
                  </p>
                </Form.Floating>

                {/* password  */}
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                  />
                  <label htmlFor="password">
                    Password:
                    <span className={validPassword ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPassword || !password ? "hide" : "invalid"}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <p
                    id="pwdnote"
                    className={
                      passwordFocus && !validPassword ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <br />
                    8 to 24 characters. Must include uppercase and lowercase
                    letters, a number and special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dolar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>
                </Form.Floating>

                <Form.Floating className="mb-3">
                  <Form.Control
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPassword(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch && matchPassword ? "valid" : "hide"}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span
                      className={validMatch || !matchPassword ? "hide" : "invalid"}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                  </label>
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <br />
                    Must match the first password input field.
                  </p>
                </Form.Floating>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Accept T&C"
                    className="text-start"
                  />
                </Form.Group>
                <Button
                  disabled={
                    !validName || !validEmail || !validPassword || !validMatch
                      ? true
                      : false
                  }
                  className="w-30"
                  variant="outline-secondary"
                  type="submit"
                >
                  Sign Up
                </Button>
                <Card.Text className="mt-3">
                  <Form.Text className="text-muted">
                    Already have an account? Login{" "}
                    <a
                      href="#"
                      style={{ color: "inherit" }}
                      onClick={changeState}
                    >
                      here
                    </a>
                  </Form.Text>
                </Card.Text>
              </Form>
            </Card.Body>
          </Card>
        </section>
      )}
    </>
  );
};

export default RegisterForm;

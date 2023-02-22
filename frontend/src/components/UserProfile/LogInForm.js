import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import image from "./Vibely.png";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "/auth/login";

export default function LogInForm({ setSetAccount }) {
  const { setAuth } = useContext(AuthContext);
  const changeState = () => setSetAccount(false);

  // const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  // const [user, setUser] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  //trying to navigate to a new url for creating event
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      setAuth({ email, password, accessToken });
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Missing Username/Email or Password");
      } else if (err.response?.status === 401) {
        setError("Unauthorized! check your email or password");
      } else if (err.response.status === 404) {
        setError("No account associated with the username/email address");
      } else {
        setError("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You're logged in!</h1>
          <p>
            <a href="#">Go to Home</a>
          </p>
          {/* adding a button to create event for testing purposes */}
          {/* <button onClick={navigate("/create_event")}>Create event</button> */}
        </section>
      ) : (
        <section>
          <Card className="text-center signupCard">
            <Card.Body>
              <p
                ref={errRef}
                className={error ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {error}
              </p>
              <img
                src={image}
                alt="Logo"
                style={{ width: "100px", marginTop: "1.5em" }}
              />
              <Card.Title className="my-4">
                Please login in to your account
              </Card.Title>
              <Form className="signupForm" onSubmit={handleSubmit}>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <label htmlFor="email">Email:</label>
                </Form.Floating>

                <Form.Floating className="mb-3">
                  <Form.Control
                    type="password"
                    id="pwd"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <label htmlFor="pwd">Password:</label>
                </Form.Floating>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    className="text-start"
                  />
                </Form.Group>

                <Card.Text className="mt-3 text-end">
                  <Form.Text className="text-muted">
                    <a href="#" style={{ color: "inherit" }}>
                      Forgot password?
                    </a>
                  </Form.Text>
                </Card.Text>

                <Button variant="outline-secondary" type="submit">
                  Login
                </Button>

                <Card.Text className="mt-3">
                  <Form.Text className="text-muted">
                    No account yet? Register {/* here react router link */}
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
}

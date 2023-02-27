import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Container }from "react-bootstrap";
import image from "./Vibely.png";
import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./registerform.css"

const LOGIN_URL = "/auth/login";

export default function LogInForm({ setSetAccount }) {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // const changeState = () => setSetAccount(false);

  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        JSON.stringify({ email, name: user, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setUser(JSON.stringify(response?.data));
      console.log(user);
      console.log(JSON.stringify(response?.data));

      console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      setAuth({ email, name: user, password, accessToken });
      setUser("");
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
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
    <Container className="d-flex justify-content-center" style={{ minHeight: "100vh"}}>
      <div className="w-100" style={{ maxWidth: "400px"}}>
      <Card className="text-center card">
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
          <Card.Title className="my-4">
            <h2>Login in to your account</h2>
          </Card.Title>
          <Form className="form" onSubmit={handleSubmit}>
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

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    className="text-start"
                  />
                </Form.Group> */}

            <Card.Text className="mt-3 text-end">
              <Form.Text className="text-muted">
                <a href="#" style={{ color: "inherit" }}>
                  Forgot password?
                </a>
              </Form.Text>
            </Card.Text>

            <Button className="w-100 my-3" variant="outline-secondary" type="submit">
              Login
            </Button>

            <Card.Text className="mt-1">
              <Form.Text className="text-muted">
                No account yet? Register <Link to="/register">here</Link>
              </Form.Text>
            </Card.Text>
          </Form>
        </Card.Body>
      </Card>
      </div>
    </Container>
  );
}

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import image from "./Vibely.png";

export default function RegisterForm({setSetAccount}) {
    const changeState = () => setSetAccount(true);
     
 return (
   <>
   <Card className="text-center signupCard">
      <Card.Body>
        <img
          src={image}
          alt="Logo"
          style={{ width: "100px", marginTop: "1.5em" }}
        />
        <Card.Title className="my-4">
          Create a new account
        </Card.Title>
        <Form className="signupForm">
          <Form.Group className="mb-3">
            <Form.Control
              type="username"
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Username or email"
            />
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
  )
}

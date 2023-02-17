import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import image from "./Vibely.png";

export default function LogInForm({setSetAccount}) {
     const changeState = () => setSetAccount(false);

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
          Please login in to your account
        </Card.Title>
        <Form className="signupForm">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Username or email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          
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
              No account yet? Register{" "}
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

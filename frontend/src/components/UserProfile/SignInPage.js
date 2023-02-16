import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import image from "./Vibely.png";

export default function SignInPage() {
  return (
    <>
      <Card style={{ width: "70vw", margin: "auto" }}>
        <Card.Body>
          <img src={image} alt="Logo" style={{ width: "100px" }} />
          <Card.Title className="my-4">Please login in to your account</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              {/* <Form.Label>User name / Email address</Form.Label> */}
              <Form.Control type="email" placeholder="Enter your user name or email" />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="outline-secondary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

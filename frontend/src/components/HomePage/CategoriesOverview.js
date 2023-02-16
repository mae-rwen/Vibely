import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function CategoriesOverview() {
  return (
    <>
      <Container className="p-3">
        <div className=" d-flex flex-column align-items-center gap-4">
          <h3 className="mb-0">Check out the activities!</h3>
          <div className="d-flex flex-column  flex-lg-row gap-3 ">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Skill sharing</Card.Title>

                <ul className="card-events-list">
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                </ul>

                <button className="btn btn-outline-secondary btn-md px-2">
                  Show more
                </button>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Connect and Socialize</Card.Title>

                <ul className="card-events-list">
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                </ul>
                <button className="btn btn-outline-secondary btn-md px-2">
                  Show more
                </button>
                {/* <Card.Link href="#">Show more</Card.Link> */}
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Let's play</Card.Title>

                <ul className="card-events-list">
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                </ul>

                <button className="btn btn-outline-secondary btn-md px-2">
                  Show more
                </button>
              </Card.Body>
            </Card>
          </div>
          <button className="btn btn-outline-secondary btn-md px-4">
            Explore All Activities
          </button>
        </div>
      </Container>
    </>
  );
}

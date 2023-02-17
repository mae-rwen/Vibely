import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
export default function HomePage() {
  return (
    <>
      <div className="container hpSection ">
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

                <Button variant="outline-secondary">Show more</Button>
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
                <Button variant="outline-secondary">Show more</Button>
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

                <Button variant="outline-secondary">Show more</Button>
              </Card.Body>
            </Card>
          </div>

          <Button href="/categories" variant="outline-secondary">
            Explore All Activities
          </Button>
        </div>
      </div>
    </>
  );
}

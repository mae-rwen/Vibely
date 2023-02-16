import Card from "react-bootstrap/Card";
export default function HomePage() {
  return (
    <>
      <div className="container hpSection ">
        <div className="activities d-flex flex-column align-items-center ">
          <h3>Check out the activities!</h3>
          <div className="d-flex flex-column flex-md-wrap flex-md-row gap-3 ">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Skill sharing</Card.Title>

                {/* <Card.Text> */}
                <ul className="card-events-list">
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                </ul>
                {/* </Card.Text> */}
                <Card.Link href="#">Card Link</Card.Link>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Connect and Socialize</Card.Title>

                {/* <Card.Text> */}
                <ul className="card-events-list">
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                </ul>
                {/* </Card.Text> */}
                <Card.Link href="#">Card Link</Card.Link>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Let's play</Card.Title>

                {/* <Card.Text> */}
                <ul className="card-events-list">
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                  <li>Learn german in Dortmund</li>
                </ul>
                {/* </Card.Text> */}
                <Card.Link href="#">Card Link</Card.Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

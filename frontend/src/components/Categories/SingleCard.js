import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function SingleCard({ categories }) {  

  return (
    <div className="categoriesCards">
       {categories.map((category) => {       
        return (
          <Card key={category._id} className="card text-center">
            <Card.Img variant="top" src={category.picture} />
            <Card.Body>
              <Card.Title className="fw-bold">{category.name}</Card.Title>
              <Card.Text className="text-end">
                <a href="#top"><strong>{category.eventTotal}</strong> events in this category</a>
              </Card.Text>
              <Button
                className="catBtn"
                variant="warning"
                href={`/allevents/${category._id}`}
              >
                Explore the activities
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

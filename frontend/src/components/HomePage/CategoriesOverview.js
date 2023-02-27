import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Carousel from "react-bootstrap/Carousel";

export default function HomePage({ categories }) {
  return (
    <>
      <div className="hpSection">
        <h5 className="fw-bold">Check out the activities!</h5>
        <div className="row p-4 mt-4 text-center justify-content-center">
          <Carousel>
            {categories.map((category) => {
              return (
                <Carousel.Item style={{height: "20em"}} key={category._id}>
                  <img
                    className="d-block w-100"
                    src={category.picture}
                    alt={`Slide for ${category.name}`}
                  />
                  <Carousel.Caption className="carouselCaption">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>

        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button href="/categories" variant="outline-secondary">
            Explore All Activities
          </Button>
        </div>
      </div>
    </>
  );
}

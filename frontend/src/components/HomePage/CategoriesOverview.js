import Button from "react-bootstrap/esm/Button";
import Carousel from "react-bootstrap/Carousel";
import LoadingSpinner from "../GeneralComponents/LoadingSpinner";

export default function HomePage({ categories, isLoaded }) {
  return (
    <>
      <div className="hpSection">
        <h5 className="fw-bold">Check out the activities!</h5>

        {isLoaded ? (
          <>
            <div className="row p-4 mt-4 text-center justify-content-center">
              <Carousel>
                {categories.map((category) => {
                  return (
                    <Carousel.Item
                      style={{ height: "25em" }}
                      key={category._id}
                    >
                      <img
                        className="carouselPic"
                        src={category.picture}
                        alt={`Slide for ${category.name}`}
                      />
                      <Carousel.Caption className="carouselCaption p-4 mb-3">
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>{" "}
            </div>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Button href="/categoriesfe" variant="secondary">
                Explore All Activities
              </Button>
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
}

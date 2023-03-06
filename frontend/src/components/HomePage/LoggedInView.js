import Button from "react-bootstrap/esm/Button";
import Carousel from "react-bootstrap/Carousel";
import LoadingSpinner from "../GeneralComponents/LoadingSpinner";

export default function LoggedInView({ categories, isLoaded, user }) {
  return (
    <>
      <div id="loggedInHero" className="text-center mb-5">        
          <h1 className="display-4 fw-bold">
            Hello {user?.name ? user?.name : "stranger"}!
          </h1>
          <div className="col-lg-8 mx-auto">
            <p className="lead mb-4">
              Your space for sharing skills, get involved in new hobbies and
              find friends to vibe with.
            </p>
            
          </div>    

        {isLoaded ? (
          <>
            <div className="row 4 mt-3 text-center justify-content-center loggedInCarousel">
              <Carousel>
                {categories.map((category) => {
                  return (
                    <Carousel.Item
                      style={{ height: "40em" }}
                      key={category._id}
                    >
                      <img
                        className="d-block carouselPic"
                        src={category.picture}
                        alt={`Slide for ${category.name}`}
                      />
                      <Carousel.Caption className="carouselCaption p-4 mb-5">
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-2">
                <Button href={`/allevents/${category._id}`} variant="dark">
                  Explore the activities
                </Button>
              </div>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>{" "}
              
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
}

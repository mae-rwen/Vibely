import Button from "react-bootstrap/esm/Button";
import Carousel from "react-bootstrap/Carousel";
import LoadingSpinner from "../GeneralComponents/LoadingSpinner";

export default function LoggedInView({ categories, isLoaded, user }) {
  return (
    <>
    <div id="loggedInHero" className="text-center">
      <h1 className="display-4 fw-bold">Hello {user?.name? (user?.name):("stranger")}!</h1>
      <div className="col-lg-8 mx-auto">
        <p className="lead mb-4">
          Your space for sharing skills, get involved in new hobbies and find
          friends to vibe with.
        </p>   
       
      </div>
    

           

        {isLoaded ? (
          <>
            <div className="row 4 mt-3 text-center justify-content-center">
              <Carousel>
                {categories.map((category) => {
                  return (
                    <Carousel.Item
                      style={{ height: "20em" }}
                      key={category._id}
                    >
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
              </Carousel>{" "}
               <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-3">
              <Button href="/categories" variant="secondary">
                Explore All Activities
              </Button>
            </div>     
            </div>
          
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
  </>
  )
}

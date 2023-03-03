import Button from "react-bootstrap/Button";

export default function HeroSection() {
  return (
    <>
      <div id="heroSection" className="text-center">
        <h1 className="display-4 fw-bold">Welcome to Vibely</h1>
        <div className="col-lg-8 mx-auto">
          <p className="lead mb-4">
            Your space for sharing skills, get involved in new hobbies and find
            friends to vibe with.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button variant="secondary" href="#introduction">
              Check it out!
            </Button>
            <Button variant="outline-secondary" href="/login">
              Log in to your profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

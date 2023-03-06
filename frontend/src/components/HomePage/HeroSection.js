import Button from "react-bootstrap/Button";
import { useRef, useEffect } from 'react';

export default function HeroSection() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const parallax = parallaxRef.current;
    window.addEventListener('scroll', () => {
      parallax.style.backgroundPositionY = -window.pageYOffset / 2 + 'px';
    });
  }, []);

  return (
    <>
      <div id="heroSection" className="text-center" ref={parallaxRef}>
        <span>
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
        </span>
      </div>
    </>
  );
}

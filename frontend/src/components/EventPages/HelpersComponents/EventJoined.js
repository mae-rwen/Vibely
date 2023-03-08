import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export default function EventJoined() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [remainingTime, setRemainingTime] = useState(5);


  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      navigate("/profile");
    }
  }, [navigate, remainingTime]);

  return (
    <div id="construction" className="text-center">
      <h4 className="display-8 fw-bold">
        Way to go! You succefully joined the event.
      </h4>
      <p>Soon you'll get a message from the organizer with more details.</p>
      <p>You'll be redirected to your profile in {remainingTime} seconds...</p>
      <div className="col-lg-8 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Button
            variant="secondary"
            href="/profile"
          >
           Got to profile
          </Button>
          <Button
            variant="secondary"
            href="/allevents"
          
          >
           See all events
          </Button>

         
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";


export default function EventSuccess() {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(3);


  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      navigate('/allevents');
    }
  }, [navigate, remainingTime]);

  return (
    <div id="construction" className="text-center">
      <h4 className="display-8 fw-bold">
        You have successfully deleted your event!
      </h4>
      <p>You'll be redirected to the events list in {remainingTime} seconds...</p>
      <div className="col-lg-8 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button
            variant="secondary"
            href="/allevents"          
          >
            See all events
          </Button>
          <Button
            variant="outline-secondary"
            href="/profile"       
          >
            Go to your user profile
          </Button>
        </div>
      </div>
    </div>
  );
}

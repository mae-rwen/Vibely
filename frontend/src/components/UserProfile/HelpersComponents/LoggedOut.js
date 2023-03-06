import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";


export default function LoggedOut() {
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
      navigate('/');
    }
  }, [navigate, remainingTime]);

  return (
    <div id="construction" className="text-center">
      <h4 className="display-8 fw-bold">
        See you next time!
      </h4>
      <p>You've been successfully logged out.<br/>
      You'll be redirected to the homepage in {remainingTime} seconds...</p>
      <div className="col-lg-8 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

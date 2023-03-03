import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export default function EventJoined() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div id="construction" className="text-center">
      <h4 className="display-8 fw-bold">
        Way to go! You succefully joined the event.
      </h4>
      <div className="col-lg-8 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/allevents");
            }}
          >
            Go to Events List
          </Button>

          <Button
            variant="secondary"
            onClick={goBack}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

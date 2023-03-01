import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export default function EventSuccess() {
  const navigate = useNavigate();

  return (
    <div id="construction" className="text-center">
      <h4 className="display-8 fw-bold">
        You have successfully created a new event.
      </h4>
      <div className="col-lg-8 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/allevents");
            }}
          >
            Go back to events list
          </Button>
        </div>
      </div>
    </div>
  );
}

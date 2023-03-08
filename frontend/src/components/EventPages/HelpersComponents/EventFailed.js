import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export default function EventFailed() {
  const navigate = useNavigate();

  return (
    <div id="construction" className="text-center">
      <h4 className="display-8 fw-bold">
        Event creation failed.Please select the Location and Category properly.
      </h4>
      <div className="col-lg-8 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button
            variant="secondary"
            href="/create_event"
          >
            Create an Event
          </Button>
        </div>
      </div>
    </div>
  );
}

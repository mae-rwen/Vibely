import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

export default function EventSuccess() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/allevents");
  };
  return (
    <div className="text-center">
      <h1>You have successfully created a new event.</h1>
      <Button onClick={goBack} variant="outline-secondary">
        All Events
      </Button>
    </div>
  );
}

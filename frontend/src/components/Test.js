import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

export default function Test() {

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section>
      <div>
        <h1>something here</h1>
        <Button onClick={goBack} variant="outline-secondary">Go Back</Button>
      </div>   
    </section>
  )
}

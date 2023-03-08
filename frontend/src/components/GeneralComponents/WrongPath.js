import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

export default function WrongPath() {
  const navigate = useNavigate();

  return (
    <div id="construction" className="text-center">
      <h4 className="display-8 fw-bold">Ups! Something went wrong.</h4>
      <div className="col-lg-8 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button
            variant="outline-warning"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}

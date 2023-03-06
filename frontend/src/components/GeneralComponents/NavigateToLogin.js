import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

export default function NavigateToLogin() {
  const navigate = useNavigate();

  return (
    <div id="construction" className="text-center">
      <h4 className="display-8 fw-bold">Please login or register to proceed</h4>
      <div className="col-lg-8 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}

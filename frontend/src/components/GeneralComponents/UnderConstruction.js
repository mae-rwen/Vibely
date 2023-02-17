import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';

export default function UnderConstruction() {
    const navigate = useNavigate();

  return (
    <>
        <div id="construction" className="text-center">
            <h4 className="display-8 fw-bold">This page is under construction</h4>
            <div className="col-lg-8 mx-auto">
                <p className="lead mb-4">Please visit later</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Button variant="secondary" onClick={()=>{navigate(-1)}}>Go back</Button>
                </div>
            </div>
        </div>
    </>
  )
}

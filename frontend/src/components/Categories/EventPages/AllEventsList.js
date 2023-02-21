import { Button } from "react-bootstrap";
import EventsList from "./EventsList";
import Filtering from "./Filtering";

export default function AllEventsList() {
  return (
    <>
      <div className="eventsHeader">
            <h3 className=" fw-bold text-start">{`Events around <<chosen category name>>`}</h3>
            <div className="col-lg-8 mx-auto text-start">
                <p>Elit pariatur Lorem et cupidatat reprehenderit aliqua anim aliqua nisi.</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-end mb-4">
                    <Button variant="secondary">Create new event</Button>                    
                </div>
            </div>
        </div>
      <div className="eventsLists">
        <EventsList />
        <Filtering />
      </div>
    </>
  );
}

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

export default function Introduction() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hpSection">
        <h5 className=" fw-bold">What is this about?</h5>
        <p>
          Vibely is a great way to meet new people, explore new interests, and
          share your passions with others. Here's a quick guide on how to use
          our platform to connect with like-minded people and explore events.
        </p>
        <Collapse in={open}>
          <div id="collapse-text">
            <ol>
              <li>1. Create a user profile to get started.</li>
              <li>
                2. Browse through categories and events that interest you.
              </li>
              <li>3. Find an event of interest and RSVP to join.</li>
              <li>
                4. Connect with the event's organizer and other attendees.
              </li>
            </ol>
            <p>You can also create your own events for others to join.</p>
            <p>Happy vibing!</p>

            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Button variant="outline-secondary" href="/instructions">
                Read more about it
              </Button>
            </div>
          </div>
        </Collapse>
        <p
          className="text-end showMoreP"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          {open ? "show less" : "show more"}
        </p>
      </div>
    </>
  );
}

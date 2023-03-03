import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import CreatedEvent from "./CreatedEvent";
import Joined from "./Joined";

function EventsDisplay() {
    const [key, setKey] = useState('joined')

  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="joined" title="Joined">
          <Joined />
        </Tab>
        <Tab eventKey="created" title="Created">
          <CreatedEvent />
        </Tab>
      </Tabs>
    </div>
  );
}

export default EventsDisplay;

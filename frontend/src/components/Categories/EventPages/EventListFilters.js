import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function EventListFilters({
  location,
  locationQuery,
  setLocationQuery,
}) {
  // console.log(location);
  // console.log(locationQuery);

  return (
    <>
      <div className="eventsFilters">
        <DropdownButton
          as={ButtonGroup}
          variant="outline-secondary"
          title="Location"
        >
          <Dropdown.Item style={{ fontWeight: "bold" }}>
            All locations
          </Dropdown.Item>
          {location.map((value, id) => {
            return (
              <div key={id}>
                <Dropdown.Divider onClick={() => setLocationQuery(value)} />
                <Dropdown.Item>{value}</Dropdown.Item>
              </div>
            );
          })}
        </DropdownButton>

        {/* {["Filter 1", "Filter 2", "Filter 3", "Filter 4"].map(
          (variant) => (
            <DropdownButton
              as={ButtonGroup}
              key={variant}
              id={`dropdown-variants-${variant}`}
              variant="outline-secondary"
              title={variant}
            >
              <Dropdown.Item eventKey="1">Action</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>            
            </DropdownButton>
          )
        )} */}
        <Button id="createNew" variant="secondary" href="/create_event">
          Create new event
        </Button>
      </div>
    </>
  );
}

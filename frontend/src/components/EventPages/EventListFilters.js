import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function EventListFilters({
  location,
  types,
  getCategories,
  locationQuery,
  setLocationQuery,
  typeQuery,
  setTypeQuery,
  categoryQuery,
  setCategoryQuery,
}) {
  return (
    <>
      <div className="eventsFilters">
        {/* Location filter */}
        <DropdownButton
          as={ButtonGroup}
          variant="outline-secondary"
          title="Location"
        >
          <Dropdown.Item
            style={{ fontWeight: "bold" }}
            onClick={(e) => {
              setLocationQuery("");
            }}
          >
            All locations
          </Dropdown.Item>
          {location.map((value, id) => {
            return (
              <div key={id}>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={(e) => {
                    setLocationQuery(value);
                  }}
                >
                  {value}
                </Dropdown.Item>
              </div>
            );
          })}
        </DropdownButton>

        {/* Categories filter */}
        <DropdownButton
          as={ButtonGroup}
          variant="outline-secondary"
          title="Category"
        >
          <Dropdown.Item
            style={{ fontWeight: "bold" }}
            onClick={(e) => {
              setCategoryQuery("");
            }}
          >
            All categories
          </Dropdown.Item>
          {getCategories.map((value, id) => {
            return (
              <div key={id}>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={(e) => {
                    setCategoryQuery(value._id);
                  }}
                >
                  {value.name}
                </Dropdown.Item>
              </div>
            );
          })}
        </DropdownButton>

        {/* Types filter */}
        <DropdownButton
          as={ButtonGroup}
          variant="outline-secondary"
          title="Type"
        >
          <Dropdown.Item
            style={{ fontWeight: "bold" }}
            onClick={(e) => {
              setTypeQuery("");
            }}
          >
            All events
          </Dropdown.Item>
          {types.map((value, id) => {
            return value ? (
              <div key={id}>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={(e) => {
                    setTypeQuery(value);
                  }}
                >
                  {value}
                </Dropdown.Item>
              </div>
            ) : (
              ""
            );
          })}
        </DropdownButton>

        <Button
          variant="secondary"
          onClick={(e) => {
            setTypeQuery("");
            setCategoryQuery("");
            setLocationQuery("");
          }}
        >
          Reset all filters
        </Button>

        <Button id="createNew" variant="secondary" href="/create_event">
          Create new event
        </Button>
      </div>
      {locationQuery || categoryQuery || typeQuery  ? (
        <p>
          Active filters:{" "}
          {locationQuery ? `location - ${locationQuery} || ` : ""}
          {categoryQuery 
            ? `category - ${getCategories.map((value) => {
                if (value._id === categoryQuery) {
                  return value.name;
                }
              })} || `
            : ""}
          {typeQuery  ? `type - ${typeQuery} ||` : ""}
        </p>
      ) : (
        ""
      )}
    </>
  );
}

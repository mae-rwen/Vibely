import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import cities from "cities.json";
import Form from "react-bootstrap/Form";

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
  setSortBy,
  eventsToDisplay
}) {
  const germanCities = cities.filter((city) => city.country === "DE");
  const filteredCities = germanCities.filter((value) => location.includes(value.name));

  const handleLocationQuery = (e) => {
    if (e.target.value === "All locations") {
      setLocationQuery("");
    } else {
      setLocationQuery(e.target.value);
    }
  };

  return (
    <>
      <div className="eventsFilters">
        <div className="filtersButtons">
          {/* Location filter */}

          <Form.Select
            aria-label="Default select example"
            onChange={handleLocationQuery}            
          >
            <option style={{ fontWeight: "bold" }}>All locations</option>
            {eventsToDisplay.map((city, index) => (
              <option key={index} value={city.general_location}>
                {city.general_location}
              </option>
            ))}
          </Form.Select>          

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

          {/* sorting button */}
          <DropdownButton
            as={ButtonGroup}
            variant="outline-secondary"
            title="Sort"
          >
            <DropdownItem
              onClick={(e) => {
                setSortBy("dateAsc");
              }}
            >
              Nearest date
            </DropdownItem>
            <Dropdown.Divider />
            <DropdownItem
              onClick={(e) => {
                setSortBy("dateDesc");
              }}
            >
              Furthest date
            </DropdownItem>
            <Dropdown.Divider />
            <DropdownItem
              onClick={(e) => {
                setSortBy("locationAsc");
              }}
            >
              By location ↑
            </DropdownItem>
            <Dropdown.Divider />
            <DropdownItem
              onClick={(e) => {
                setSortBy("locationDesc");
              }}
            >
              By location ↓
            </DropdownItem>
            <Dropdown.Divider />
            <DropdownItem
              onClick={(e) => {
                setSortBy("organizer");
              }}
            >
              By organizer
            </DropdownItem>
            <Dropdown.Divider />
            <Dropdown.Item
              style={{ fontWeight: "bold" }}
              onClick={(e) => {
                setSortBy("createdAt");
              }}
            >
              Reset sorting
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="createNewButton">
          <Button id="createNew" variant="secondary" href="/create_event">
            Create new event
          </Button>
        </div>
      </div>
      {locationQuery || categoryQuery || typeQuery ? (
        <p>
          Active filters:{" "}
          {locationQuery ? `location - ${locationQuery} || ` : ""}
          {categoryQuery
            ? `category - ${
                getCategories.find((value) => {
                  return value._id === categoryQuery;
                }).name
              } || `
            : ""}
          {typeQuery ? `type - ${typeQuery} ||` : ""}
        </p>
      ) : (
        ""
      )}
    </>
  );
}

import cities from "cities.json";
import Form from "react-bootstrap/Form";

export default function CitySelector({ setEventLocation }) {
  const germanCities = cities.filter((city) => city.country === "DE");

  const handleCitySelect = (event) => {
    setEventLocation(event.target.value);
  };

  return (
    <div>
      <Form.Select
        aria-label="Default select example"
        onChange={handleCitySelect}
        className="citySelector"
        required
      >
        <option value="">Choose a city</option>
        {germanCities.map((city, index) => (
          <option key={index} value={city.name}>
            {city.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

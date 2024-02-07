import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import Body from "./components/Body";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAllNames().then((allNames) => {
      setCountryNames(allNames);
      setLoading(false);
    });
  }, []);

  const handleSelect = (countryName) => setSelectedCountry(countryName);

  if (loading) return <div>Loading...</div>;

  const filterCountries = () => {
    // If a country's show button is selected
    // we display that country
    if (selectedCountry !== null) return [selectedCountry];

    // If search query is empty, all countries
    if (searchQuery.length === 0) return countryNames;

    // Otherwise filter countries based on the search query
    return countryNames.filter((c) =>
      c.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleCountryChange = ({ target: { value } }) => {
    // if the input field is changed
    // we clear the country selection
    setSelectedCountry(null);
    setSearchQuery(value);
  };

  return (
    <div>
      <div>
        {`find countries `}
        <input value={searchQuery} onChange={handleCountryChange} />
      </div>
      <Body
        searchQuery={searchQuery}
        countryNames={filterCountries()}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default App;

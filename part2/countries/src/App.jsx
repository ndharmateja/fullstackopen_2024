import { useEffect, useState } from "react";
import countriesService from "./services/countries";
import Body from "./components/Body";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryNames, setCountryNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    countriesService.getAllNames().then((allNames) => {
      setCountryNames(allNames);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  const filterCountries = () =>
    searchQuery.length === 0
      ? countryNames
      : countryNames.filter((c) =>
          c.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const handleCountryChange = ({ target: { value } }) => setSearchQuery(value);

  return (
    <div>
      <div>
        {`find countries `}
        <input value={searchQuery} onChange={handleCountryChange} />
      </div>
      <Body searchQuery={searchQuery} countryNames={filterCountries()} />
    </div>
  );
};

export default App;

import CountryInfo from "./CountryInfo";

const Body = ({ searchQuery, countryNames, handleSelect }) => {
  if (searchQuery.length === 0)
    return <div>Start typing a country name...</div>;

  if (countryNames.length > 10)
    return <div>Too many matches, specify another filter.</div>;

  if (countryNames.length > 1)
    return (
      <div>
        {countryNames.map((name) => (
          <div key={name}>
            {`${name} `}
            <button onClick={() => handleSelect(name)}>show</button>
            <br />
          </div>
        ))}
      </div>
    );

  if (countryNames.length === 0) return <div>No matches found.</div>;

  return <CountryInfo countryName={countryNames[0]} />;
};

export default Body;

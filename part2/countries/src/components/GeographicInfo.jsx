const GeographicInfo = ({ countryInfo }) => {
  const {
    name: { common: name },
    capital: [capital],
    area,
    languages,
    flags: { png: flagSrc },
  } = countryInfo;

  const getLanguagesList = () =>
    Object.entries(languages).map((l) => l[l.length - 1]);

  return (
    <div>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h4>languages:</h4>
      <ul>
        {getLanguagesList().map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <br />
      <img src={flagSrc} width={150} />
    </div>
  );
};

export default GeographicInfo;

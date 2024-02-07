const WeatherInfo = ({ weatherInfo }) => {
  const {
    name,
    weather: [{ icon }],
    main: { temp },
    wind: { speed },
  } = weatherInfo;

  return (
    <div>
      <h3>Weather in {name}</h3>
      <p>temperature {temp}°C</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
      <p>wind {speed} m/s</p>
    </div>
  );
};

export default WeatherInfo;

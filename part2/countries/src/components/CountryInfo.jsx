import { useEffect, useState } from "react";
import countriesService from "../services/countries";
import weatherService from "../services/weather";
import GeographicInfo from "./GeographicInfo";
import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ countryName }) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const [weather, setWeather] = useState({ info: null, error: false });

  useEffect(() => {
    countriesService.getOneCountry(countryName).then((c) => {
      setCountryInfo(c);
      const {
        capital: [capital],
      } = c;
      weatherService
        .getWeather(capital)
        .then((w) => setWeather({ info: w, error: false }))
        .catch(() => setWeather({ info: null, error: true }));
    });
  }, [countryName]);

  return (
    <div>
      {countryInfo === null ? (
        <h3>Geographical info loading...</h3>
      ) : (
        <GeographicInfo countryInfo={countryInfo} />
      )}

      {weather.error ? (
        <h3>No weather data available.</h3>
      ) : weather.info === null ? (
        <h3>Weather info loading...</h3>
      ) : (
        <WeatherInfo weatherInfo={weather.info} />
      )}
    </div>
  );
};

export default CountryInfo;

import { useEffect, useState } from "react";
import countriesService from "../services/countries";
import weatherService from "../services/weather";
import GeographicInfo from "./GeographicInfo";
import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ countryName }) => {
  const [countryInfo, setCountryInfo] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    countriesService.getOneCountry(countryName).then((c) => {
      setCountryInfo(c);
      const {
        capital: [capital],
      } = c;
      weatherService.getWeather(capital).then((w) => setWeatherInfo(w));
    });
  }, [countryName]);

  return (
    <div>
      {countryInfo === null ? (
        <div>Geographical info loading...</div>
      ) : (
        <GeographicInfo countryInfo={countryInfo} />
      )}

      {weatherInfo === null ? (
        <div>Weather info loading...</div>
      ) : (
        <WeatherInfo weatherInfo={weatherInfo} />
      )}
    </div>
  );
};

export default CountryInfo;

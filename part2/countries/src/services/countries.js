import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllNames = () =>
  axios
    .get(`${baseUrl}/all`)
    .then((response) => response.data.map((c) => c.name.common));

const getOneCountry = (countryName) =>
  axios.get(`${baseUrl}/name/${countryName}`).then((response) => response.data);

export default { getAllNames, getOneCountry };

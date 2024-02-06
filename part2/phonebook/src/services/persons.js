import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const create = (person) => {
  return axios.post(baseUrl, person).then((response) => response.data);
};

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export default { create, getAll };

import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const create = (person) =>
  axios.post(baseUrl, person).then((response) => response.data);

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const update = (newPerson) =>
  axios
    .put(`${baseUrl}/${newPerson.id}`, newPerson)
    .then((response) => response.data);

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export default { create, getAll, update, remove };

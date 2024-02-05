import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchQuery, setNewSearchQuery] = useState("");

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleSearchQueryChange = (e) => setNewSearchQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.map((p) => p.name).includes(newName)) {
      window.alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons((persons) =>
      persons.concat({
        name: newName,
        number: newPhone,
        id: persons.length + 1,
      })
    );
    setNewName("");
    setNewPhone("");
  };

  const filteredPersons = () => {
    if (searchQuery.length === 0) return persons;

    return persons.filter(({ name }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons()} />
    </div>
  );
};

export default App;

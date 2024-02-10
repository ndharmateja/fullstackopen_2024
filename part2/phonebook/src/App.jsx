import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchQuery, setNewSearchQuery] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  });

  useEffect(() => {
    personsService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handleSearchQueryChange = (e) => setNewSearchQuery(e.target.value);

  const handleDelete = (person) => {
    const { name, id } = person;
    if (!window.confirm(`Delete ${name}?`)) return;

    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        showNotification(`Deleted ${name}`, false, 5000);
      })
      .catch(() => {
        // Remove this person from the list of persons
        removePersonFromDisplay(id);
        showNotification(
          `Information of ${name} has already been removed from server`,
          true,
          5000
        );
      });
  };

  const removePersonFromDisplay = (id) =>
    setPersons(persons.filter((p) => p.id !== id));

  const shouldUpdateOldNumber = (name) =>
    window.confirm(
      `${name} is already added to phonebook, replace the old number with a new one?`
    );

  const updatePersonsAndClear = (newPersons) => {
    setPersons(newPersons);
    setNewName("");
    setNewPhone("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // see if a person object exists with the same name
    const person = persons.find((p) => p.name === newName);

    // if the new name already exists
    // and the user confirms to replace, we replace it
    if (person) {
      if (!shouldUpdateOldNumber(newName)) {
        return;
      }

      // If the new name already exists and the user confirms update
      // we update the number
      personsService
        .update({ ...person, number: newPhone })
        .then((updatedPerson) => {
          const newPersons = persons.map((p) =>
            p.id === updatedPerson.id ? updatedPerson : p
          );
          updatePersonsAndClear(newPersons);
          showNotification(`Updated ${newName}`, false, 5000);
        })
        .catch((e) => {
          console.log(e);
          // Remove this person from the list of persons
          // removePersonFromDisplay(person.id);
          // showNotification(
          //   `Information of ${newName} has already been removed from server`,
          //   true,
          //   5000
          // );
        });
      return;
    }

    // if the new name doesn't exist
    // we create a new entry
    personsService
      .create({ name: newName, number: newPhone })
      .then((p) => {
        updatePersonsAndClear(persons.concat(p));
        showNotification(`Added ${newName}`, false, 5000);
      })
      .catch((e) => {
        console.log(e.response.data.error);
        showNotification(e.response.data.error, true, 5000);
      });
  };

  const filteredPersons = () => {
    if (searchQuery.length === 0) return persons;

    return persons.filter(({ name }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const showNotification = (message, isError, duration) => {
    setNotification({ message, isError });
    setTimeout(() => {
      clearNotification();
    }, duration);
  };

  const clearNotification = () =>
    setNotification({ ...notification, message: null });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        isError={notification.isError}
      />
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
      <Persons handleDelete={handleDelete} persons={filteredPersons()} />
    </div>
  );
};

export default App;

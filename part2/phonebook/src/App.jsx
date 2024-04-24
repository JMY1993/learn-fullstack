import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./service/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filterChar, setFilterChar] = useState("");

  const handleFilterInput = (event) => {
    const input = event.target.value;
    if (!input.startsWith(" ")) {
      setFilterChar(event.target.value);
    }
  };

  const handleSubmit = (name, number) => (e) => {
    e.preventDefault();
    if (
      persons.some(
        (person) =>
          person.name === name &&
          !window.confirm(
            `${name} is already added to phonebook, replace the old number with a new one?`
          )
      )
    ) {
      return;
    }
    const newPerson = {
      name,
      number,

    };
    phonebookService
      .create(newPerson)
      .then((res) => setPersons([...persons, res]))
      .catch((err) => console.log("add new person failed: ", err));
  };

  const handleRemove = (id) => () => {
    phonebookService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id != id));
      })
      .catch((err) => console.log("Error removing person: ", err));
  };
  useEffect(() => {
    phonebookService
      .getAll()
      .then((res) => {
        setPersons(res);
      })
      .catch((err) =>
        console.log("Error fetching data from the server: ", err.message)
      );
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterChar={filterChar} onChange={handleFilterInput} />

      <h3>Add a new</h3>

      <PersonForm handleSubmit={handleSubmit} />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filterChar={filterChar}
        removePersonWithID={handleRemove}
      />
    </div>
  );
};

export default App;

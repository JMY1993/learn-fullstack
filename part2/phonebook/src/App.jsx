import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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
    if (persons.some((person) => person.name === name)) {
      alert(`${name} is already added to phonebook`);
      return;
    }
    setPersons([
      ...persons,
      {
        name,
        number,
        id: persons.length + 1,
      },
    ]);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterChar={filterChar} onChange={handleFilterInput} />

      <h3>Add a new</h3>

      <PersonForm handleSubmit={handleSubmit} />

      <h3>Numbers</h3>

      <Persons persons={persons} filterChar={filterChar} />
    </div>
  );
};

export default App;

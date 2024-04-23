import { useState } from "react";

const Filter = ({ filterChar, onChange }) => {
  return (
    <div>
      <label htmlFor="filterInput">filter shown with </label>
      <input
        type="text"
        id="filterInput"
        value={filterChar}
        onChange={onChange}
      />
    </div>
  );
};
const PersonForm = ({ handleSubmit }) => {
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const handleNameInput = (event) => setNameInput(event.target.value);
  const handleNumberInput = (event) => setNumberInput(event.target.value);

  return (
    <form onSubmit={handleSubmit(nameInput, numberInput)}>
      <div>
        <label htmlFor="nameInput">name: </label>
        <input
          type="text"
          id="nameInput"
          value={nameInput}
          onChange={handleNameInput}
        />
      </div>
      <div>
        <label htmlFor="numberInput">number: </label>
        <input
          type="text"
          id="numberInput"
          value={numberInput}
          onChange={handleNumberInput}
        />
      </div>
      <button>add</button>
    </form>
  );
};
const Persons = ({ persons, filterChar }) => {
  const shownPersons =
    filterChar === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterChar.toLowerCase())
        );

  return (
    <div>
      {shownPersons.map((person) => (
        <div key={person.id}>
          {person.name}: {person.number}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [filterChar, setFilterChar] = useState("");

  const handleFilterInput = (event) => {
    const input = event.target.value;
    if (!input.startsWith(" ")) {
      setFilterChar(event.target.value);
    }
  };

  const handleSubmit = (name, number) => (e) => {
    e.preventDefault();
    if (persons.some(person=>person.name === name)){
      alert(`${name} is already added to phonebook`);
      return;
    }
    setPersons([...persons, {
      name, number, id:persons.length+1
    }])
  };
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

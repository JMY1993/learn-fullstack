const Persons = ({ persons, filterChar, removePersonWithID }) => {
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
          <button onClick={removePersonWithID(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
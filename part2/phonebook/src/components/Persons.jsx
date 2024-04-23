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

export default Persons;
import {useState} from 'react'

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
export default PersonForm;
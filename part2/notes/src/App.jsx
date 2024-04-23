import Note from "./components/Note";
import { useState } from "react";

const App = ({ initNotes }) => {
  const [notes, setNotes] = useState(initNotes);

  const [currentNote, setCurrentNote] = useState({
    id: notes.length + 1,
    content: "",
    important: Math.random() < 0.5,
  });

  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleInput = (event) => {
    setCurrentNote({ ...currentNote, content: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentNote.content != "") {
      setNotes([...notes, currentNote]);
      setCurrentNote({
        content: "",
        id: notes.length + 2,
        important: Math.random() < 0.5,
      });
    } else {
      alert("There is no new note to save.");
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={toggleShowAll}>show {showAll?"important":"all"}</button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={currentNote.content} onChange={handleInput} />
        <button>save</button>
      </form>
    </div>
  );
};

export default App;

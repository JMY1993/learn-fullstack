import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [currentNote, setCurrentNote] = useState("");

  const [showAll, setShowAll] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const [msgClassName, setMsgClassName] = useState("success");

  const handleMsg = (msg, className) => {
    setMsgClassName(className);
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 4000);
  };
  const handleInput = (event) => {
    setCurrentNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentNote != "") {
      noteService
        .create({ content: currentNote, important: Math.random() < 0.5 })
        .then((res) => {
          setNotes([...notes, res]);
          setCurrentNote("");
          handleMsg(`Added note ${res.content}`, `success`);
        })
        .catch((err) => {
            handleMsg(
              `Save to server failed! ${err}`,
              `error`
            );
        });
    } else {
      alert("There is no new note to save.");
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleImportance = (id) => () => {
    let newNote = notes.find((note) => note.id === id);
    newNote = { ...newNote, important: !newNote.important };
    noteService
      .update(id, newNote)
      .then((res) => setNotes([...notes.filter((note) => note.id != id), res]))
      .catch((err) => {
        handleMsg(
          `Note ${newNote.content} was already removed from server. Message: ${err}`,
          `error`
        );
      });
  };

  const remove = (id) => () => {
    noteService
      .remove(id)
      .then(() => {
        setNotes(notes.filter((note) => note.id != id));
        handleMsg(
          `Successfully removed Note ${
            notes.find((note) => note.id === id).content
          }.`,
          `success`
        );
      })
      .catch((err) => {
        handleMsg(
          `Note ${
            notes.find((note) => note.id === id).content
          } was already removed from server. Message: ${err}`,
          `error`
        );
      });
  };
  useEffect(() => {
    noteService
      .getAll()
      .then((res) => {
        setNotes(res);
      })
      .catch((err) => {
        handleMsg(`Failed fetching data from server. Message: ${err}`, `error`);
      });
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} className={msgClassName} />
      <button onClick={toggleShowAll}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={toggleImportance(note.id)}
            removeThisNote={remove(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={currentNote} onChange={handleInput} />
        <button>save</button>
      </form>
    </div>
  );
};

export default App;

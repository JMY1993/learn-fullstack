import Note from "./components/Note";
import noteService from "./services/notes";
import { useState, useEffect } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [currentNote, setCurrentNote] = useState("");

  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleInput = (event) => {
    setCurrentNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentNote != "") {
      noteService.create({content:currentNote, important:Math.random()<0.5})
      .then((res) => {
        setNotes([...notes, res]);
        setCurrentNote("");
      })
      .catch(err=>{
        console.log(`submission failed!:`, err)
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
    noteService.update(id, newNote) 
      .then((res) =>
        setNotes([...notes.filter((note) => note.id != id), res])
      )
      .catch(err=>{
        console.log('toggle importance failed: ', err)
      });
  };
  
  const remove = (id) => () => {
    noteService.remove(id)
    .then(()=>{
      setNotes(notes.filter(note=>note.id != id))
    })
    .catch(err=> console.log('remove note failed:', err))
  }
  useEffect(() => {
    noteService.getAll().then((res) => {
      setNotes(res);
    })
    .catch(err=>console.log('fetch from the server failed: ', err))
  }, []);

  return (
    <div>
      <h1>Notes</h1>
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

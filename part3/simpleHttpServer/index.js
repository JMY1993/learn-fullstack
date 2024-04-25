const express = require("express");
const app = express();
const notes = require("./db.json");

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});
const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

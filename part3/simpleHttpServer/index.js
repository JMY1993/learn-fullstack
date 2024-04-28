const express = require("express");
const app = express();
const notes = require("./db.json");

app.use(express.json());

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

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  console.log(
    `Deleted note: ${notes.notes.find((note) => note.id === id).content}.`
  );
  res.status(204).end();
});
const PORT = 3001;

app.post("/api/notes", (req, res) => {
  const note = req.body;
  console.log(note);
  res.status(404).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

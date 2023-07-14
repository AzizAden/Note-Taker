const customNotes = require('express').Router();
const db = require('../db');

customNotes.get('/api/notes', (req, res) => {
  db.fetchAllNotes()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => res.status(500).json(err));
});

customNotes.post('/api/notes', (req, res) => {
  db.saveNote(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json(err));
});

customNotes.post('/api/notes/:id', (req, res) => {
  res.send(`Retrieve the array of notes - search for the provided id: ${req.params.id}`);
});

customNotes.delete('/api/notes/:id', (req, res) => {
  db.removeNote(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = customNotes;

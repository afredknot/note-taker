const note = require('express').Router();
const uuid = require('../../../helpers/uuid')
// GET Route for retrieving all the note

note.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
note.post('/', (req, res) => {
  console.log(req.body);

  if (req.body) {
    const newNote = {
      noteTitle,
      noteText,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

module.exports = note;

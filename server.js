const express = require('express');
const fs = require('fs');
// const util = require('util');
// const { readFromFile } = require('./Develop/public//helpers/fsUtils');
const path = require('path');
// const makeNote = require ('./Develop/db/db.json')
const api = require('./Develop/public/assets/js/index.js')
const app = express();

const PORT =  process.env.PORT || 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));
// -----------------------------------
// app.get('api/notes', (req,res) => {
//   res.json(makeNote.slice(1));
// })

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
);

app.post('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
);
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/index.html'))
);
//---------------------------------------
function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray))
      notesArray = [];
  
  if (notesArray.length === 0)
      notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, makeNotes);
  res.json(newNote);
});
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

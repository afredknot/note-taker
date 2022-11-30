const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT =  process.env.PORT || 3001;
const makeNote = require('./db/db.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// -----------------------------------
// app.get('api/notes', (req,res) => {
//   res.json(makeNote.slice(1));
// })

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
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

app.post('./api/notes', (req, res) => {
  const newNote = createNewNote(req.body, makeNote);
  res.json(newNote);
});
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

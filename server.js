const express = require('express');
const path = require('path');
const api = require('./Develop/public/assets/js/index.js')
const app = express();
const PORT =  process.env.PORT || 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));
// -----------------------------------


app.get('/', (req, res) => res.send(__dirname, './Develop/public/index.html'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
);

app.post('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/index.html'))
);
//---------------------------------------

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

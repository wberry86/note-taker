const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// logs incoming data from local host
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
};

// Init middleware
app.use(logger);

let notes = require('./Develop/db/db.json');


//api routes
app.get('/api/notes', (req, res) => {
  console.log(req.query)
  res.sendFile(path.join(__dirname, './Develop/db/db.json'));
  return res.json(notes);
});

app.get("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync('./Develop/db/db.json', "utf8"));
  res.json(savedNotes[Number(req.params.id)]);
});


app.post("/api/notes", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync('./Develop/db/db.json', "utf8"));
  let newNote = req.body;
  let uniqueID = (savedNotes.length).toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);

  fs.writeFileSync('./Develop/db/db.json', JSON.stringify(savedNotes));
  console.log("Note saved to db.json. Content: ", newNote);
  res.json(savedNotes);
})


/*
app.post('/api/notes', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});
*/


//html routes
// posts index.html to server
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });
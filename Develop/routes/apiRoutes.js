const router = require("express").Router();
const { notes } = require("../db/db.json");
const path = require("path");
const fs = require('fs');
const {
  filterByQuery,
  validateNotes,
  createNewNote,
  findById,
} = require("../lib/notes");

router.get("/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});


// Create Note
router.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();

  if (!validateNotes(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

// Delete Note
router.delete("/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "../db/db.json");
    for (let i = 0; i < notes.length; i++) {

        if (notes[i].id == req.params.id) {
            notes.splice(i, 1);
            break;
        }
    }
    
    fs.writeFileSync(jsonFilePath, JSON.stringify(notes), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was deleted!");
        }
    });
    res.json(notes);
    
});


module.exports = router;

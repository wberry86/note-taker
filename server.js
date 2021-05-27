const db = require('./Develop/db/db.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.get('/api/notes', (req, res) => {
  res.json(db);
});

app.listen(3001, () => {
    console.log(`API server now on port ${PORT}`);
  });
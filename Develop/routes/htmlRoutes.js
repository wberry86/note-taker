const path = require('path');
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

module.exports = htmlRoutes;
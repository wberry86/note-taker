const path = require('path');
//html routes
// posts index.html to server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
  });
  
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
    //write function to grab data from db.json and send to html file
    logic.getNotes
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
  });

  // add POST route

  
  module.exports = apiRoutes;
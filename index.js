const express = require('express');
const bodyParser = require('body-parser');
const { initDB } = require('./db');
const routes = require('./routes/routes.js');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http').Server(app);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  next(); 
});

app.use('/api', routes);
app.use('/', (req, res) => {
  res.end('helloooo')  
});


// start the database and then the server
initDB((err, database) => {
  if (err) {
    console.log(`FATAL MONGODB CONNECTION ERROR: ${err}:${err.stack}`)
    process.exit(1)
  }
  app.locals.db = database.db('node_app');
  http.listen(port, () => {
    console.log("Listening on port " + port)
    app.emit('APP_STARTED')
  });
});

module.exports = app
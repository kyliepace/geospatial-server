const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const dbName = process.env.NODE_ENV === 'dev' ? 'database-test' : 'database' 
const url = `mongodb://mongo:27017`
const options = {
  useNewUrlParser: true, 
  reconnectTries: 60, 
  reconnectInterval: 1000
}
const routes = require('./routes/routes.js')
const port = process.env.PORT || 3000
const app = express()
const http = require('http').Server(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', (req, res) => {

  MongoClient.connect(url, function (err, client) {
    if (err) return next(err);    
    var db = client.db('node_app')

    if (err) return next(err);
    res.end('helloooo')
  	
  }); 

  //res.end("Hello world\n");
});
app.use('/api', routes)
app.use((req, res) => {
  res.status(404)
})

MongoClient.connect(url, options, (err, database) => {
  if (err) {
    console.log(`FATAL MONGODB CONNECTION ERROR: ${err}:${err.stack}`)
    process.exit(1)
  }
  app.locals.db = database.db('api')
  http.listen(port, () => {
    console.log("Listening on port " + port)
    app.emit('APP_STARTED')
  })
})

module.exports = app
const MongoClient = require('mongodb').MongoClient
const url = `mongodb://mongo:27017`
// const dbName = process.env.NODE_ENV === 'dev' ? 'database-test' : 'database' 
const options = {
  useNewUrlParser: true, 
  reconnectTries: 60, 
  reconnectInterval: 1000
};

let db;
function initDB(callback) {
  if (db) {
    console.warn('Database is already connected')
    return callback(null, db);
  }

  MongoClient.connect(url, options, (err, database) => {
    if(err){ callback(err) }
    console.log('database initialized: ', url);
    db = database;
    return callback(null, db);
  });
};

function getDB() {
  if (!db){
    console.warn('Database has not been initalized.');
  }
  return db;
};

module.exports = { getDB, initDB }
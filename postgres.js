const { Pool } = require('pg')

let pool;

async function initDB(callback) {
  pool = new Pool();
  return callback(null, pool)
};

function getDB() {
  if (!pool){
    console.warn('database not initalized')
  }
  return pool;
}

async function query(queryString) {
  let db = await pool.connect();
  try{
    const res = await db.query(queryString)
    return res;
  }
  catch(err){
    console.log(err);
  }
  finally{
    db.release();
  }
}

module.exports = { getDB, initDB, query}
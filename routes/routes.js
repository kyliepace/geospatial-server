const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    // database connection available at req.app.locals.db
    const db = req.app.locals.db;
    // db.collection('geojson').insertOne({name: 'test'}, (err, r) => {
    //   console.log('added to database')
    //     console.log(r)
    // })
    next();
});

router.get('/darkness', (req, res) => {
  const db = req.app.locals.db;
  return db.collection('geojson').findOne({name: 'darkness'}, (err, geojson) => {
    console.log(geojson);
    res.json(geojson);
  });
});

module.exports = router;
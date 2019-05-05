const express = require('express')
const router = express.Router();
const handleError = require('./handleError');
const { query } = require('../postgres');

router.get('/crime', async (req, res) => {
  console.log('get crime data')
  //const db = req.app.locals.db;
  try {
    const { lat, lng } = JSON.parse(req.query.point);  
    let queryString = `SELECT ST_AsGeoJSON(point) AS point, category FROM bath_police ORDER BY ST_Distance(point, ST_MakePoint(${lng}, ${lat})) LIMIT 20;`
    let crimePoints = await query(queryString);
    console.log(crimePoints.rows)
    res.json(crimePoints.rows);
  }
  catch(err){
    res.sendStatus(500);
  }
});

module.exports = router;
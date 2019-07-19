const express = require('express');
const router = express.Router();
const turf = require('@turf/turf');
const handleError = require('./handleError');

router.get('/darkness', async (req, res) => {
  const db = req.app.locals.db;
  try {
    const darkness = await db.collection('geojson').findOne({'name': 'darkness'});
console.log(darkness)
    return res.json(darkness.geometry);
  }
  catch(err){ handleError(err) }
});

router.get('/paths', async (req, res) => {
  const db = req.app.locals.db;
  try {
    const geojsons = await db.collection('geojson').find({ 'geometry.type': 'LineString' }).toArray();
    console.log('geojsons found: ', geojsons.length)
    // return res.json(geojson[0].geometry);

    const pathToPolygon = turf.lineToPolygon(geojsons[0].geometry.coordinates[0]);
    const darkness = await db.collection('geojson').findOne({'name': 'darkness'});
    const difference = turf.difference(darkness.geometry, pathToPolygon);
    console.log(difference)
    return res.json(difference);

  }
  catch(err){ handleError(err) }
});

router.post('/paths', async (req, res) => {
  console.log('post request to paths')
  const db = req.app.locals.db;
  const proposedGeoJson = {
    name: req.body.name,
    geometry: req.body.features[0].geometry
  }
  try{
    await db.collection('geojson').insertOne(proposedGeoJson);
    return res.sendStatus(200);
  }
  catch(err){ handleError(err)}
});

module.exports = router;
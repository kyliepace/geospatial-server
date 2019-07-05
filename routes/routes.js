const express = require('express')
const router = express.Router();
const handleError = require('./handleError');

router.get('/darkness', (req, res) => {
  const db = req.app.locals.db;
  return db.collection('geojson').findOne({name: 'darkness'}, (err, geojson) => {
    if (err) { handleError(err, res) }
    console.log('darkness polygon passed to client');
    res.json(geojson);
  });
});

router.get('/paths', (req, res) => {
  const db = req.app.locals.db;
  return db.collection('geojson').find({type: 'path'}, { feature: true })
  .toArray()
  .then(paths => {
    const featurePaths = paths.map(path => {
      return path.feature
    });
    res.json({features: featurePaths});
  })
  .catch(err => handleError(err))
});

router.post('/path', (req, res) => {
  const db = req.app.locals.db;
  const proposedGeoJson = JSON.parse(req.body);

  // parse to make sure correct geojson form
  let pathGeoJson = {
    type: 'Feature',
    ... proposedGeoJson
  };

  return db.collection('geojson').insertOne(pathGeoJson, (err) => {
    if (err) { handleError(err, res) }
    res.sendStatus(200);
  });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const turf = require('@turf/turf');
const handleError = require('./handleError');


router.get('/analysis/:operation', async (req, res) => {
  let query;
  try {
    const db = req.app.locals.db;
    switch(req.params.operation) {
      case 'geoWithin':
        const bigPolygon = await db.collection('geojson').findOne({'name': 'darkness'});
        query = {geometry: {'$geoWithin': {'$geometry': bigPolygon.geometry }}};
        break;
      case 'near':
        query = {geometry: {'$near': {
          '$geometry': {
            type: 'Point',
            coordinates: [-2.364099, 51.382239]
          },
          $maxDistance: 500 // distance in meters
        }}}
        break;
      default:
        break;
    };
    const geojsons = await db.collection('geojson').find(query).toArray();
    return res.json(geojsons.map(({geometry}) => geometry));
  }
  catch(err) { handleError(err)}
});

router.get('/:type', async (req, res) => {

  let geojsonType = 'Point';
  switch(req.params.type) {
    case 'paths':
      geojsonType = 'LineString';
      break;
    case 'polygons':
      geojsonType = 'Polygon'
      break;
  }

  try {
    const db = req.app.locals.db;
    const geojsons = await db.collection('geojson').find({ 'geometry.type': geojsonType }).toArray();
    return res.json(geojsons.map(({geometry}) => geometry))
  }
  catch(err){ handleError(err) }
});


module.exports = router;
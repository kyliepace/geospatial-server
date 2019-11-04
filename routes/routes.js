const express = require('express');
const router = express.Router();
const turf = require('@turf/turf');
const handleError = require('./handleError');

// geospatial aggregation pipeline
router.get('/pipeline', async (req, res) => {
  const db = req.app.locals.db;
  const geojsons = await db.collection('geojson').aggregate([
    {
      '$geoNear': {
        "near": {
          "type": "Point",
          "coordinates": [ -2.364099, 51.382239 ]
        },
        "minDistance": 5000, //5km
        "maxDistance": 500000, // 500km
        "spherical": true,
        "distanceField": "distance"
      }
    },

    {
      '$match': {
        'geometry.type': 'Point'
      }
    }
  ]).toArray();
  return res.json(geojsons.map(({distance, geometry}) => { return {distance, geometry}} ));
});

router.get('/cut-out', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { geometry: bigPolygon } = await db.collection('geojson').findOne({'name': 'darkness'});
    const { geometry: smallPolygon } = await db.collection('geojson').findOne({'name': 'cheese-polygon'});
    const mask = turf.polygon(bigPolygon.coordinates); // exterior rings
    const polygon = turf.polygon(smallPolygon.coordinates); //interior rings
    const cutOut = turf.mask(polygon, mask);
    return res.json(cutOut.geometry);
  }
  catch(err) { handleError(err)}
});

router.post('/analysis/near', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const distance = req.body.distance;
    const query = { geometry: {'$near': {
      '$geometry': {
        type: 'Point',
        coordinates: [-2.364099, 51.382239]
      },
      $maxDistance: parseInt(distance) // distance in meters
    }}};
    const geojsons = await db.collection('geojson').find(query).toArray();
    return res.json(geojsons.map(({geometry}) => geometry));
  }
  catch(err) { handleError(err)}
});

// geospatial query
router.get('/analysis/:operation', async (req, res) => {
  let query;
  try {
    const db = req.app.locals.db;
    switch(req.params.operation) {
      case 'geoWithin':
        const bigPolygon = await db.collection('geojson').findOne({'name': 'darkness'});
        query = { geometry: {'$geoWithin': {'$geometry': bigPolygon.geometry }}};
        break;
      case 'intersects':
        const { geometry } = await db.collection('geojson').findOne({'name': 'darkness'});
        query = { geometry: {'$geoIntersects': {'$geometry': geometry }}};
        break;

      default:
        break;
    };
    const geojsons = await db.collection('geojson').find(query).toArray();
    return res.json(geojsons.map(({geometry}) => geometry));
  }
  catch(err) { handleError(err)}
});

// retrieve geojsons by type
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
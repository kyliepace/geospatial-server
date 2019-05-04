const router = require('express').Router();
var fs = require('fs');
const { query } = require('../postgres');

router.get('/police', async (req, res) => {
  try {
    console.log('get data')
    const police = await JSON.parse(fs.readFileSync('crime.geojson', 'utf8'));

    for(var i = 0; i < 101; i++){
      let { id, category} = police.features[i].properties;
      let geom = `ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [${police.features[i].geometry.coordinates}]}')`
      let queryString = `INSERT INTO bath_police (id, point, category) VALUES ('${id}', ST_AsText(${geom}), '${category}');`
      await query(queryString);
    }
    res.sendStatus(200);
  }
  catch(err){
    console.log(err);
    res.sendStatus(500)
  }
  finally{
    console.log('done')
  }
});



module.exports = router;
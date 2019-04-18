const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    // database connection available at req.app.locals.db
    const db = req.app.locals.db;
    db.collection('geojson').insertOne({name: 'test'}, (err, r) => {
        console.log(r)
    })
    next();
});

module.exports = router;
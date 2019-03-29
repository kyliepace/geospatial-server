const express = require('express')
const router = express.Router();

router.get('/documents/all', (req, res, next) => {
    next();
});

module.exports = router;
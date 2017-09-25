const express = require('express');
const router = express.Router();
const worlds = require('./worlds');

router.use('/worlds', worlds);

module.exports = router;

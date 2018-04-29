const express = require('express');
const router = express.Router();
const worlds = require('./worlds');
const guilds = require('./guilds');

router.use('/worlds', worlds);
router.use('/guilds', guilds);

module.exports = router;

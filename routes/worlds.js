const express = require('express');
const router = express.Router();
const worlds = require('../server_modules/worlds');

router.get('/', worlds.listAll);
router.get('/:world', worlds.listPlayers);

module.exports = router;

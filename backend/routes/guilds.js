const express = require('express');
const router = express.Router();
const guilds = require('../server_modules/guilds');

router.get('/', guilds.list);
router.get('/:guild', guilds.listMembers);

module.exports = router;

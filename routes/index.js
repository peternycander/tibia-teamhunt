const express = require('express');
const router = express.Router();
const worlds = require('./worlds');
const guilds = require('./guilds');

router.use('/worlds', worlds);
router.use('/guilds', guilds);
router.get('/', (req, res) => {
  res.redirect('https://teamhunt.netlify.com')
})

module.exports = router;

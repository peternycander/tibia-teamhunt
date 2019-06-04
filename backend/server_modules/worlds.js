const fetch = require('node-fetch');
const htmlparser = require('htmlparser2');
const moment = require('moment');

let worldListCache;
let worldListCacheTimeout = moment();

const worldsCache = {};

module.exports = {
  listAll: listAllApi,
  listPlayers
};

async function listAll() {
  let response;
  try {
    response = await fetch('https://www.tibia.com/community/?subtopic=worlds');
    if (!response.ok) {
      throw new Error('Getting worlds resulted in not ok status');
    }
    response = await response.text();
  } catch (error) {
    console.error(error);
    throw error;
  }
  let worlds = {};
  let inWorld = false;
  let parser = new htmlparser.Parser(
    {
      onopentag: function(name, attribs) {
        if (name === 'a' && attribs.href && attribs.href.includes('world=')) {
          inWorld = true;
        }
      },
      ontext: function(text) {
        if (inWorld) {
          worlds[text.toLowerCase()] = text;
        }
      },
      onclosetag: function(tagname) {
        if (tagname === 'a') {
          inWorld = false;
        }
      }
    },
    {decodeEntities: true}
  );
  parser.write(response);
  parser.end();
  worldListCache = worlds;
  worldListCacheTimeout = moment().add(1, 'day');
  return worlds;
}

async function listAllApi(req, res) {
  if (moment().isBefore(worldListCacheTimeout)) {
    return res.send(worldListCache);
  }
  let worlds;
  try {
    worlds = await listAll();
  } catch (err) {
    return res.status(500).send();
  }
  res.send(worlds);
}

async function listPlayers(req, res) {
  let world = req.params.world.toLowerCase();
  let cacheEntry = worldsCache[world] || {};
  if (moment().isBefore(cacheEntry.timeout)) {
    return res.send(cacheEntry.players);
  }
  let worlds;
  try {
    worlds = await listAll();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
  if (!worlds[world]) {
    return res.status(400).send('World is not a valid world');
  }
  world = worlds[world];
  let response;
  try {
    response = await fetch(`https://www.tibia.com/community/?subtopic=worlds&world=${world}`);
    if (!response.ok) {
      console.error(`Getting ${world} resulted in not ok status`);
      return res.status(500).send();
    }
    response = await response.text();
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
  let players = [];
  let currentPlayer = {};
  let inPlayer = false;
  let inLevel = false;
  let inVocation = false;
  let pendingLevel = false;
  let parser = new htmlparser.Parser(
    {
      onopentag: function(name, attribs) {
        if (name === 'a' && attribs.href && attribs.href.includes('name=')) {
          inPlayer = true;
        } else if (name === 'td' && pendingLevel) {
          inLevel = true;
          pendingLevel = false;
        }
      },
      ontext: function(text) {
        if (inPlayer) {
          currentPlayer.name = currentPlayer.name ? currentPlayer.name + text : text;
        } else if (inLevel) {
          currentPlayer.level = parseInt(text, 10);
        } else if (inVocation) {
          currentPlayer.vocation = currentPlayer.vocation ? currentPlayer.vocation + text : text;
        }
      },
      onclosetag: function(tagname) {
        if (tagname === 'a' && inPlayer) {
          inPlayer = false;
          pendingLevel = true;
        } else if (tagname === 'td' && inLevel) {
          inLevel = false;
          inVocation = true;
        } else if (inVocation) {
          inVocation = false;
          // eslint-disable-next-line  no-irregular-whitespace
          currentPlayer.name = currentPlayer.name.replace(/ /g, ' ');
          players.push(Object.assign({}, currentPlayer));
          currentPlayer = {};
        }
      }
    },
    {decodeEntities: true}
  );
  parser.write(response);
  parser.end();
  worldsCache[world.toLowerCase()] = {
    timeout: moment().add(1, 'minute'),
    players
  };
  res.send(players);
}

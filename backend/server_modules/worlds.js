const fetch = require('node-fetch');
const htmlparser = require('htmlparser2');
const moment = require('moment');

let worldCache;
let worldCacheTimeout = moment();

module.exports = {
  listAll
};

async function listAll(req, res) {
  if (moment().isBefore(worldCacheTimeout)) {
    return res.send(worldCache);
  }
  let response;
  try {
    response = await fetch('https://secure.tibia.com/community/?subtopic=worlds');
    response = await response.text();
  } catch (error) {
    console.error(error);
    return res.status(500).send();
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
  worldCache = worlds;
  worldCacheTimeout = moment().add(1, 'day');
  res.send(worlds);
}

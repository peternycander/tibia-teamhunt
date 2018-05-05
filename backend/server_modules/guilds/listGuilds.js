const fetch = require('node-fetch');
const htmlparser = require('htmlparser2');
const moment = require('moment');

let guildListCache = {};
let guildListCacheTimeout = moment();
const nonGuildBoldTexts = ['Logo', 'Description', '&nbsp;'];

async function listGuilds(world) {
  let response;
  try {
    response = await fetch(
      `https://secure.tibia.com/community/?subtopic=guilds&world=${world}`
    );
    if (!response.ok) {
      throw new Error('Getting guilds resulted in not ok status');
    }
    response = await response.text();
  } catch (error) {
    console.error(error);
    throw error;
  }
  let guilds = [];
  let inBoldTag = false;
  let parser = new htmlparser.Parser(
    {
      onopentag: function(name) {
        if (name === 'b') {
          inBoldTag = true;
        }
      },
      ontext: function(text) {
        if (inBoldTag && !nonGuildBoldTexts.includes(text) && text.trim()) {
          guilds.push(text);
        }
      },
      onclosetag: function(tagname) {
        if (tagname === 'b') {
          inBoldTag = false;
        }
      }
    },
    {decodeEntities: true}
  );
  parser.write(response);
  parser.end();
  guildListCache[world] = guilds;
  guildListCacheTimeout[world] = moment().add(1, 'hour');
  return guilds;
}

module.exports = async function listApi(req, res) {
  const world = req.query.world;
  if (!world) {
    return res.status(400).send({msg: 'Missing world param'});
  }
  if (moment().isBefore(guildListCacheTimeout[world])) {
    return res.send(guildListCache[world]);
  }
  let guilds;
  try {
    guilds = await listGuilds(world);
  } catch (err) {
    return res.status(500).send();
  }
  res.send(guilds);
};

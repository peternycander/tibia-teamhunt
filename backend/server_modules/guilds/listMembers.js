const fetch = require('node-fetch');
const htmlparser = require('htmlparser2');
const moment = require('moment');

let guildListCache = {};
let guildListCacheTimeout = moment();

async function listGuildMembers(guild) {
  console.log(`Listing guild members for guild ${guild}`);
  let response;
  try {
    response = await fetch(
      `https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=${guild}`
    );
    if (!response.ok) {
      throw new Error('Getting guild members resulted in not ok status');
    }
    response = await response.text();
  } catch (error) {
    console.error(error);
    throw error;
  }
  let guildMembers = [];
  let afterInvitedCharacters = false;
  let inHeader = false;
  let parser = new htmlparser.Parser(
    {
      onopentag: function(name, attribs) {
        if (name === 'a' && attribs.href && attribs.href.includes('characters&name=')) {
          if (afterInvitedCharacters) {
            return;
          }
          const currentPlayer = attribs.href.split('characters&name=')[1];
          guildMembers.push(currentPlayer.replace(/\+/g, ' '));
        }
        if (name === 'div' && attribs.class && attribs.class.toLowerCase().includes('text')) {
          inHeader = true;
        }
      },
      ontext: function(text) {
        if (inHeader && text.toLowerCase().includes('invited')) {
          afterInvitedCharacters = true;
        }
      }
    },
    {decodeEntities: true}
  );
  parser.write(response);
  parser.end();
  guildListCache[guild] = guildMembers;
  guildListCacheTimeout[guild] = moment().add(1, 'hour');
  return guildMembers;
}

module.exports = async function listApi(req, res) {
  const guild = req.params.guild;
  if (!guild) {
    return res.status(400).send({msg: 'Missing guild param'});
  }
  if (moment().isBefore(guildListCacheTimeout[guild])) {
    return res.send(guildListCache[guild]);
  }
  let guildMembers;
  try {
    guildMembers = await listGuildMembers(guild);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
  res.send(guildMembers);
};

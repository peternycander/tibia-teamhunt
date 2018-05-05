export default function(dispatch) {
  return {
    loadGuilds,
    toggleGuild
  };

  async function loadGuilds(world) {
    dispatch({
      type: 'LOAD_GUILDS_STARTED'
    });
    let guilds;
    try {
      let response = await fetch(`/guilds?world=${world}`);
      if (!response.ok) {
        return dispatch({
          type: 'LOAD_GUILDS_ERROR',
          payload: 'Cannot connect to tibia.com'
        });
      }
      guilds = await response.json();
    } catch (error) {
      console.error(error);
      return dispatch({
        type: 'LOAD_GUILDS_ERROR'
      });
    }
    dispatch({
      type: 'LOAD_GUILDS_DONE',
      payload: guilds
    });
  }
  function toggleGuild(guild, event) {
    dispatch({
      type: 'TOGGLE_GUILD',
      payload: guild
    });
    const setToActive = event.target.checked;
    if (setToActive) {
      loadGuild(guild);
    }
  }
  async function loadGuild(guild) {
    dispatch({
      type: 'LOAD_GUILD_STARTED'
    });
    let guilds;
    try {
      let response = await fetch(`/guild/${guild}`);
      if (!response.ok) {
        return dispatch({
          type: 'LOAD_GUILD_ERROR',
          payload: 'Cannot connect to tibia.com'
        });
      }
      guilds = await response.json();
    } catch (error) {
      console.error(error);
      return dispatch({
        type: 'LOAD_GUILD_ERROR'
      });
    }
    dispatch({
      type: 'LOAD_GUILD_DONE',
      payload: guilds
    });
  }
}

export default function(dispatch) {
  return {
    loadGuilds
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
}

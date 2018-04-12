export default function(dispatch) {
  return {
    loadPlayers
  };

  async function loadPlayers(world) {
    dispatch({
      type: 'LOAD_PLAYERS_STARTED'
    });
    let players;
    try {
      let response = await fetch(`/worlds/${world}`);
      if (!response.ok) {
        return dispatch({
          type: 'LOAD_PLAYERS_ERROR',
          payload: 'Cannot connect to tibia.com'
        });
      }
      players = await response.json();
    } catch (error) {
      console.error(error);
      return dispatch({
        type: 'LOAD_PLAYERS_ERROR',
        payload: 'Cannot connect to tibia.com'
      });
    }
    dispatch({
      type: 'LOAD_PLAYERS_DONE',
      payload: {
        list: players,
        world
      }
    });
  }
}

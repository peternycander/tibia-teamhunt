export default {
  changeWorld,
  loadWorlds,
  loadPlayers
};

export function changeWorld(world = '') {
  return {
    type: 'CHANGE_WORLD',
    payload: world
  };
}

export function loadWorlds() {
  return async dispatch => {
    dispatch({
      type: 'LOAD_WORLDS_STARTED'
    });
    let worlds;
    try {
      let response = await fetch('/worlds');
      if (!response.ok) {
        return dispatch({
          type: 'LOAD_WORLDS_ERROR',
          payload: 'Cannot connect to tibia.com'
        });
      }
      worlds = await response.json();
    } catch (error) {
      console.error(error);
      return dispatch({
        type: 'LOAD_WORLDS_ERROR'
      });
    }
    dispatch({
      type: 'LOAD_WORLDS_DONE',
      payload: worlds
    });
  };
}
export function loadPlayers(world) {
  return async dispatch => {
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
        type: 'LOAD_PLAYERS_ERROR'
      });
    }
    dispatch({
      type: 'LOAD_PLAYERS_DONE',
      payload: {
        list: players,
        world
      }
    });
  };
}

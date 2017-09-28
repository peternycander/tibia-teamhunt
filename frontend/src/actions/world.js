export default {
  changeWorld,
  loadWorlds,
  loadPlayers,
  highlightNextWorld,
  highlightPreviousWorld,
  showWorldList,
  hideWorldList,
  selectHighlighted
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
      type: 'LOAD_WORLDS_START'
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
      type: 'LOAD_PLAYERS_START'
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

export function highlightNextWorld() {
  return {
    type: 'HIGHLIGHT_NEXT_WORLD'
  };
}

export function highlightPreviousWorld() {
  return {
    type: 'HIGHLIGHT_PREVIOUS_WORLD'
  };
}

export function showWorldList() {
  return {
    type: 'SHOW_WORLD_LIST'
  };
}

export function hideWorldList() {
  return {
    type: 'HIDE_WORLD_LIST'
  };
}

export function selectHighlighted() {
  return {
    type: 'SELECT_HIGHLIGHTED_WORLD'
  };
}

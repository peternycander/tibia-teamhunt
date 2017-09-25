export default {
  changeWorld,
  loadWorlds,
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
      worlds = await response.json();
    } catch (error) {
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

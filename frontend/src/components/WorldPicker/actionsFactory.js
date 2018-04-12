export default function(dispatch) {
  return {
    loadWorlds,
    changeWorld
  };

  async function loadWorlds() {
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
  }
  function changeWorld(world) {
    dispatch({
      type: 'CHANGE_WORLD',
      payload: world
    });
  }
}

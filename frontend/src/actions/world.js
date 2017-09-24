

export function changeWorld(world = '') {
  return {
    type: 'CHANGE_WORLD',
    payload: world
  };
}
import produce from 'immer';

const defaultState = Object.freeze({
  map: {},
  unfilteredList: [],
  list: [],
  world: 'Antica',
  validWorld: true,
  error: '',
  loading: false
});

export default (state = defaultState, action = {type: ''}) =>
  produce(state, draft => {
    switch (action.type) {
      case 'INIT': {
        const {world} = action.payload;
        draft.world = world;
        return;
      }
      case 'CHANGE_WORLD': {
        const world = action.payload;
        const validWorld = !!state.map[world.toLowerCase()];
        if (validWorld) {
          try {
            localStorage.setItem('world', world);
          } catch (e) {
            //ignore localstorage if error
          }
        }
        draft.highlightedIndex = 0;
        draft.validWorld = validWorld;
        draft.world = world;
        draft.list = state.unfilteredList.filter(w =>
          w.toLowerCase().includes(world.toLowerCase())
        );
        return;
      }
      case 'LOAD_WORLDS_STARTED': {
        draft.loading = true;
        draft.error = '';
        return;
      }
      case 'LOAD_WORLDS_ERROR': {
        draft.loading = false;
        draft.error = action.payload || '';
        return;
      }
      case 'LOAD_WORLDS_DONE': {
        const listOfWorlds = Object.values(action.payload);
        draft.map = action.payload;
        draft.list = listOfWorlds;
        draft.unfilteredList = listOfWorlds;
        draft.loading = false;
        return;
      }
      default: {
        return;
      }
    }
  });

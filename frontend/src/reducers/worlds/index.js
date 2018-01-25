import {fromJS} from 'immutable';

let selectedWorld = 'Antica';
try {
  selectedWorld = localStorage.getItem('world');
} catch (e) {
  //Ignore no localStorage;
}

const defaultState = fromJS({
  map: {},
  unfilteredList: [],
  list: [],
  selectedWorld,
  validWorld: true,
  error: '',
  loading: false
});

export default function(state = defaultState, action = {type: ''}) {
  switch (action.type) {
    case 'CHANGE_WORLD': {
      const world = action.payload;
      const validWorld = !!state.getIn(['map', world.toLowerCase()]);
      if (validWorld) {
        try {
          localStorage.setItem('world', world);
        } catch (e) {
          //ignore localstorage if error
        }
      }

      return state
        .set('highlightedIndex', 0)
        .set('selectedWorld', world)
        .set('validWorld', validWorld)
        .set('list', state.get('unfilteredList').filter(w => w.toLowerCase().includes(world.toLowerCase())));
    }
    case 'LOAD_WORLDS_STARTED': {
      return state.set('loading', true).set('error', '');
    }
    case 'LOAD_WORLDS_ERROR': {
      return state.set('loading', false).set('error', action.payload || '');
    }
    case 'LOAD_WORLDS_DONE': {
      const listOfWorlds = fromJS(Object.values(action.payload));
      return state
        .set('map', fromJS(action.payload))
        .set('list', listOfWorlds)
        .set('unfilteredList', listOfWorlds)
        .set('loading', false);
    }
    default: {
      return state;
    }
  }
}

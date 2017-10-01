import {fromJS} from 'immutable';

const defaultState = fromJS({
  map: {},
  unfilteredList: [],
  list: [],
  selectedWorld: 'Antica',
  validWorld: true,
  error: '',
  loading: false
});

export default function(state = defaultState, action = {type: ''}) {
  switch (action.type) {
    case 'CHANGE_WORLD': {
      const world = action.payload;
      return state
        .set('highlightedIndex', 0)
        .set('selectedWorld', world)
        .set('validWorld', !!state.getIn(['map', world.toLowerCase()]))
        .set(
          'list',
          state.get('unfilteredList').filter(w => w.toLowerCase().includes(world.toLowerCase()))
        );
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

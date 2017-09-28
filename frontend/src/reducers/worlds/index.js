import {fromJS} from 'immutable';

const defaultState = fromJS({
  map: {},
  unfilteredList: [],
  list: [],
  selectedWorld: 'Antica',
  validWorld: true,
  highlightedIndex: -1,
  worldListVisible: false,
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
    case 'SHOW_WORLD_LIST': {
      return state.set('worldListVisible', true);
    }
    case 'HIDE_WORLD_LIST': {
      return state.set('worldListVisible', false);
    }
    case 'HIGHLIGHT_PREVIOUS_WORLD': {
      if (!state.get('worldListVisible')) {
        return state;
      }
      return state.set('highlightedIndex', Math.max(state.get('highlightedIndex') - 1, 0));
    }
    case 'SELECT_HIGHLIGHTED_WORLD': {
      return state
        .set('worldListVisible', false)
        .set('validWorld', true)
        .set('selectedWorld', state.getIn(['list', state.get('highlightedIndex')]));
    }
    case 'HIGHLIGHT_NEXT_WORLD': {
      if (!state.get('worldListVisible')) {
        return state;
      }
      return state.set(
        'highlightedIndex',
        Math.min(state.get('highlightedIndex') + 1, state.get('list').size - 1)
      );
    }
    case 'LOAD_WORLDS_START': {
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

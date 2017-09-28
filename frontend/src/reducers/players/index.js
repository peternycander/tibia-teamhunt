import {fromJS} from 'immutable';

const defaultState = fromJS({
  worlds: {},
  error: '',
  loading: false
});

export default function(state = defaultState, action = {type: ''}) {
  switch (action.type) {
    case 'LOAD_PLAYERS_DONE': {
      return state.setIn(
        ['worlds', action.payload.world, 'onlineList'],
        fromJS(action.payload.list)
      );
    }
    case 'LOAD_PLAYERS_ERROR': {
      return state.set('error', action.payload);
    }
    default: {
      return state;
    }
  }
}

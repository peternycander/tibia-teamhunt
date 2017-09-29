import {fromJS} from 'immutable';

const defaultState = fromJS({
  currentPlayer: {
    name: '',
    vocation: 'Knight',
    level: 100
  }
});

export default function(state = defaultState, action = {type: ''}) {
  switch (action.type) {
    case 'SET_CURRENT_PLAYER': {
      return state.set('currentPlayer', fromJS(action.payload));
    }
    default: {
      return state;
    }
  }
}

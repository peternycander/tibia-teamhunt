import {fromJS} from 'immutable';

const START_LEVEL = 100;
export const MIN_START_LEVEL = Math.floor(START_LEVEL * 2 / 3);
export const MAX_START_LEVEL = Math.floor(START_LEVEL * 3 / 2);

const defaultState = fromJS({
  currentPlayer: {
    name: '',
    vocation: 'Knight',
    level: START_LEVEL
  },
  shareRange: {
    min: MIN_START_LEVEL,
    max: MAX_START_LEVEL
  }
});

export default function(state = defaultState, action = {type: ''}) {
  switch (action.type) {
    case 'SET_CURRENT_PLAYER': {
      const {level} = action.payload;

      const min = Math.floor(level * 2 / 3);
      const max = Math.floor(level * 3 / 2);
      return state
        .set('currentPlayer', fromJS(action.payload))
        .set('shareRange', fromJS({min, max}));
    }
    default: {
      return state;
    }
  }
}
import worlds from './worlds';
import {fromJS} from 'immutable';

const defaultState = fromJS({
  worlds: worlds()
});

export default function(state = defaultState, action) {
  state = state.set('worlds', worlds(state.get('worlds'), action));
  return state;
}

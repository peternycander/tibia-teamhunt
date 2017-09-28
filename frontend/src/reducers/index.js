import worlds from './worlds';
import players from './players';
import {fromJS} from 'immutable';

const defaultState = fromJS({
  worlds: worlds(),
  players: players()
});

export default function(state = defaultState, action) {
  state = state.set('worlds', worlds(state.get('worlds'), action));
  state = state.set('players', players(state.get('players'), action));
  return state;
}

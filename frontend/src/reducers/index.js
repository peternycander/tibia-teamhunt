import worlds from './worlds';
import players from './players';
import team from './team';
import {fromJS} from 'immutable';

const defaultState = fromJS({
  worlds: worlds(),
  players: players(),
  team: team()
});

export default function(state = defaultState, action) {
  state = state.set('worlds', worlds(state.get('worlds'), action));
  state = state.set('players', players(state.get('players'), action));
  state = state.set('team', team(state.get('team'), action));
  return state;
}

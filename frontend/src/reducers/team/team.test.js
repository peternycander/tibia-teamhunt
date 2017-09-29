import reducer from './index';
import {fromJS} from 'immutable';

const player = ({name = 'Player', vocation = 'Knight', level = 8} = {}) => ({
  name,
  vocation,
  level
});

it('sets currentPlayer on SET_CURRENT_PLAYER', () => {
  const action = {
    type: 'SET_CURRENT_PLAYER',
    payload: player({
      name: 'Putrikio',
      level: 100,
      vocation: 'Sorcerer'
    })
  };
  const state = reducer().set('currentPlayer', fromJS(player()));
  const result = reducer(state, action);

  expect(result.getIn(['currentPlayer', 'name'])).toBe('Putrikio');
  expect(result.getIn(['currentPlayer', 'level'])).toBe(100);
  expect(result.getIn(['currentPlayer', 'vocation'])).toBe('Sorcerer');
});

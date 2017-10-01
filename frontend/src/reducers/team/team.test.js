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

it('updates shareRange correct on level 201 on SET_CURRENT_PLAYER', () => {
  const action = {
    type: 'SET_CURRENT_PLAYER',
    payload: {
      level: 201
    }
  };
  const state = reducer().set(
    'shareRange',
    fromJS({
      min: 0,
      max: 2000
    })
  );
  const result = reducer(state, action);

  expect(result.getIn(['shareRange', 'min'])).toBe(134);
  expect(result.getIn(['shareRange', 'max'])).toBe(301);
});

it('sets shareRange correct on level 105 on SET_CURRENT_PLAYER', () => {
  const action = {
    type: 'SET_CURRENT_PLAYER',
    payload: {
      level: 105
    }
  };
  const state = reducer().set(
    'shareRange',
    fromJS({
      min: 0,
      max: 2000
    })
  );
  const result = reducer(state, action);

  expect(result.getIn(['shareRange', 'min'])).toBe(70);
  expect(result.getIn(['shareRange', 'max'])).toBe(157);
});

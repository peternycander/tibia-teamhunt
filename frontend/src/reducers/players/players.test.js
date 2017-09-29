import reducer from './index';
import {fromJS} from 'immutable';

const player = ({name = 'Player', vocation = 'Knight', level = 8} = {}) => ({
  name,
  vocation,
  level
});

it('sets loading=false on LOAD_PLAYERS_DONE', () => {
  const action = {
    type: 'LOAD_PLAYERS_DONE',
    payload: {
      list: [player()],
      world: 'antica'
    }
  };
  const state = reducer().set('loading', true);
  const result = reducer(state, action);

  expect(result.get('loading')).toBe(false);
});

it('sets loading=false on LOAD_PLAYERS_ERROR', () => {
  const action = {
    type: 'LOAD_PLAYERS_ERROR'
  };
  const state = reducer().set('loading', true);
  const result = reducer(state, action);

  expect(result.get('loading')).toBe(false);
});

it('updates shareRange on SET_CURRENT_PLAYER', () => {
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
  expect(result.getIn(['shareRange', 'max'])).toBe(302);
});

it('sets loading=true on LOAD_PLAYERS_STARTED', () => {
  const action = {
    type: 'LOAD_PLAYERS_STARTED'
  };
  const state = reducer().set('loading', false);
  const result = reducer(state, action);

  expect(result.get('loading')).toBe(true);
});

it('sets players from payload of LOAD_PLAYERS_DONE', () => {
  const action = {
    type: 'LOAD_PLAYERS_DONE',
    payload: {
      list: [player(), player(), player()],
      world: 'antica'
    }
  };
  const state = reducer();
  const result = reducer(state, action);

  expect(result.getIn(['worlds', 'antica', 'onlineList']).size).toBe(3);
});

it('sets players to vocations in the world on LOAD_PLAYERS_DONE', () => {
  const paladin = player({name: 'a', vocation: 'Paladin'});
  const knight = player({name: 'a', vocation: 'Knight'});
  const eliteKnight = player({name: 'a', vocation: 'Elite Knight'});
  const action = {
    type: 'LOAD_PLAYERS_DONE',
    payload: {
      list: [knight, eliteKnight, paladin],
      world: 'antica'
    }
  };
  const state = reducer();
  const result = reducer(state, action);

  expect(result.getIn(['worlds', 'antica', 'paladins'])).toEqual(fromJS([paladin]));
  expect(result.getIn(['worlds', 'antica', 'knights']).toJS()).toEqual(
    expect.arrayContaining([knight, eliteKnight])
  );
});

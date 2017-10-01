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

it('sets loading=true on LOAD_PLAYERS_STARTED', () => {
  const action = {
    type: 'LOAD_PLAYERS_STARTED'
  };
  const state = reducer().set('loading', false);
  const result = reducer(state, action);

  expect(result.get('loading')).toBe(true);
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

  expect(result.getIn(['onlineList', 'paladins'])).toEqual(fromJS([paladin]));
  expect(result.getIn(['onlineList', 'knights']).toJS()).toEqual(
    expect.arrayContaining([knight, eliteKnight])
  );
});

it('sorts players correctly on level 10 on LOAD_PLAYERS_DONE', () => {
  const knightA = player({name: 'a', level: 40, vocation: 'Knight'});
  const knightB = player({name: 'b', level: 15, vocation: 'Knight'});
  const eliteKnight = player({name: 'c', level: 20, vocation: 'Elite Knight'});
  const action = {
    type: 'LOAD_PLAYERS_DONE',
    payload: {
      list: [knightA, knightB, eliteKnight],
      world: 'antica'
    }
  };
  const state = reducer().set('optimalLevel', 10);
  const result = reducer(state, action);

  expect(result.getIn(['onlineList', 'knights']).toJS()).toEqual([knightB, eliteKnight, knightA]);
});
it('sorts players correctly on level 28 on LOAD_PLAYERS_DONE', () => {
  const knightA = player({name: 'a', level: 40, vocation: 'Knight'});
  const knightB = player({name: 'b', level: 15, vocation: 'Knight'});
  const eliteKnight = player({name: 'c', level: 20, vocation: 'Elite Knight'});

  const action = {
    type: 'LOAD_PLAYERS_DONE',
    payload: {
      list: [knightA, knightB, eliteKnight],
      world: 'antica'
    }
  };
  const state = reducer().set('optimalLevel', 28);
  const result = reducer(state, action);
  expect(result.getIn(['onlineList', 'knights']).toJS()).toEqual([eliteKnight, knightA, knightB]);
});

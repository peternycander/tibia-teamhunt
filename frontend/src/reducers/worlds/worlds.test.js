import reducer from './index';
import {fromJS} from 'immutable';

it('sets world to payload on CHANGE_WORLD', () => {
  const action = {
    type: 'CHANGE_WORLD',
    payload: 'test'
  };
  const state = reducer();
  const result = reducer(state, action);

  expect(result.get('selectedWorld')).toBe('test');
});

it('sets validWorld=true on CHANGE_WORLD when world exists', () => {
  const action = {
    type: 'CHANGE_WORLD',
    payload: 'Antica'
  };
  const state = reducer().setIn(['map', 'antica'], 'Antica');
  const result = reducer(state, action);

  expect(result.get('validWorld')).toBe(true);
});

it('ignores case when settings validWorld on CHANGE_WORLD', () => {
  const action = {
    type: 'CHANGE_WORLD',
    payload: 'antica'
  };
  const state = reducer().setIn(['map', 'antica'], 'Antica');
  const result = reducer(state, action);

  expect(result.get('validWorld')).toBe(true);
});

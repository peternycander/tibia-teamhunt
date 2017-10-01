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

it('sets validWorld=false on CHANGE_WORLD when world does not exists', () => {
  const action = {
    type: 'CHANGE_WORLD',
    payload: 'Nova'
  };
  const state = reducer().setIn(['map', 'antica'], 'Antica');
  const result = reducer(state, action);

  expect(result.get('validWorld')).toBe(false);
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

it('filters list to include only part of selectedWorld to 0 on CHANGE_WORLD', () => {
  const action = {
    type: 'CHANGE_WORLD',
    payload: 'a'
  };
  const state = reducer()
    .set('unfilteredList', fromJS(['aba', 'bab', 'cc', 'fd']))
    .set('list', fromJS(['test']));
  const result = reducer(state, action);

  expect(result.get('list')).toEqual(fromJS(['aba', 'bab']));
});

it('sets map, list and unfilteredList on LOAD_WORLDS_DONE', () => {
  const payload = {
    antica: 'Antica',
    xylana: 'Xylana'
  };
  const action = {
    type: 'LOAD_WORLDS_DONE',
    payload
  };
  const state = reducer();
  const result = reducer(state, action);

  expect(result.get('map')).toEqual(fromJS(payload));
  expect(result.get('list')).toEqual(fromJS(['Antica', 'Xylana']));
  expect(result.get('unfilteredList')).toEqual(fromJS(['Antica', 'Xylana']));
});

it('sets loading=false on LOAD_WORLDS_DONE', () => {
  const payload = {
    antica: 'Antica',
    xylana: 'Xylana'
  };
  const action = {
    type: 'LOAD_WORLDS_DONE',
    payload
  };
  const state = reducer().set('loading', true);
  const result = reducer(state, action);

  expect(result.get('loading')).toBe(false);
});

it('sets loading=false on LOAD_WORLDS_ERROR', () => {
  const action = {
    type: 'LOAD_WORLDS_ERROR'
  };
  const state = reducer().set('loading', true);
  const result = reducer(state, action);

  expect(result.get('loading')).toBe(false);
});

it('sets error to payload of LOAD_WORLDS_ERROR', () => {
  const action = {
    type: 'LOAD_WORLDS_ERROR',
    payload: 'backend error'
  };
  const state = reducer().set('error', '');
  const result = reducer(state, action);

  expect(result.get('error')).toEqual('backend error');
});

it('sets error to empty string if payload of LOAD_WORLDS_ERROR is undefined', () => {
  const action = {
    type: 'LOAD_WORLDS_ERROR'
  };
  const state = reducer().set('error', 'err');
  const result = reducer(state, action);

  expect(result.get('error')).toEqual('');
});

it('sets loading=true on LOAD_WORLDS_STARTED', () => {
  const action = {
    type: 'LOAD_WORLDS_STARTED'
  };
  const state = reducer().set('loading', false);
  const result = reducer(state, action);

  expect(result.get('loading')).toBe(true);
});

it('resets error on LOAD_WORLDS_STARTED', () => {
  const action = {
    type: 'LOAD_WORLDS_STARTED'
  };
  const state = reducer().set('error', 'error');
  const result = reducer(state, action);

  expect(result.get('error')).toBe('');
});

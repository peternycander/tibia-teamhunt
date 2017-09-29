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

it('sets highlightedIndex to 0 on CHANGE_WORLD', () => {
  const action = {
    type: 'CHANGE_WORLD',
    payload: 'antica'
  };
  const state = reducer().set('highlightedIndex', 10);
  const result = reducer(state, action);

  expect(result.get('highlightedIndex')).toBe(0);
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

it('decreases highlightedIndex on HIGHLIGHT_PREVIOUS_WORLD when list is visible', () => {
  const action = {
    type: 'HIGHLIGHT_PREVIOUS_WORLD'
  };
  const state = reducer()
    .set('highlightedIndex', 3)
    .set('worldListVisible', true);
  const result = reducer(state, action);

  expect(result.get('highlightedIndex')).toBe(2);
});

it('does not decrease highlightedIndex to negative on HIGHLIGHT_PREVIOUS_WORLD when list is visible', () => {
  const action = {
    type: 'HIGHLIGHT_PREVIOUS_WORLD'
  };
  const state = reducer()
    .set('highlightedIndex', 0)
    .set('worldListVisible', true);
  const result = reducer(state, action);

  expect(result.get('highlightedIndex')).toBe(0);
});

it('does not decrease highlightedIndex on HIGHLIGHT_PREVIOUS_WORLD when list is not visible', () => {
  const action = {
    type: 'HIGHLIGHT_PREVIOUS_WORLD'
  };
  const state = reducer()
    .set('highlightedIndex', 3)
    .set('worldListVisible', false);
  const result = reducer(state, action);

  expect(result.get('highlightedIndex')).toBe(3);
});

it('increases highlightedIndex on HIGHLIGHT_NEXT_WORLD when list is visible', () => {
  const action = {
    type: 'HIGHLIGHT_NEXT_WORLD'
  };
  const state = reducer()
    .set('highlightedIndex', 3)
    .set('worldListVisible', true)
    .set('list', fromJS([1, 2, 3, 4, 5, 6]));
  const result = reducer(state, action);

  expect(result.get('highlightedIndex')).toBe(4);
});

it('does not increase highlightedIndex to equal world list on HIGHLIGHT_NEXT_WORLD when list is visible', () => {
  const action = {
    type: 'HIGHLIGHT_NEXT_WORLD'
  };
  const state = reducer()
    .set('highlightedIndex', 2)
    .set('worldListVisible', true)
    .set('list', fromJS([1, 2, 3]));
  const result = reducer(state, action);

  expect(result.get('highlightedIndex')).toBe(2);
});

it('does not increase highlightedIndex on HIGHLIGHT_NEXT_WORLD when list is not visible', () => {
  const action = {
    type: 'HIGHLIGHT_NEXT_WORLD'
  };
  const state = reducer()
    .set('highlightedIndex', 3)
    .set('worldListVisible', false);
  const result = reducer(state, action);

  expect(result.get('highlightedIndex')).toBe(3);
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

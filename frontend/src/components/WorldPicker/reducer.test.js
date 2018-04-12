import produce from 'immer';
import reducer from './reducer';

it('sets validWorld=true on CHANGE_WORLD when world exists', () => {
  const action = {
    type: 'CHANGE_WORLD',
    payload: 'Antica'
  };
  const state = produce(reducer(), draft => void (draft.map.antica = 'Antica'));

  const result = reducer(state, action);

  expect(result.validWorld).toBe(true);
});

it('sets validWorld=false on CHANGE_WORLD when world does not exists', () => {
  const action = {
    type: 'CHANGE_WORLD',
    payload: 'Nova'
  };
  const state = produce(reducer(), draft => void (draft.map.antica = 'Antica'));
  const result = reducer(state, action);

  expect(result.validWorld).toBe(false);
});

it('ignores case when settings validWorld on CHANGE_WORLD', () => {
  const action = {
    type: 'CHANGE_WORLD',
    payload: 'antica'
  };
  const state = produce(reducer(), draft => void (draft.map.antica = 'Antica'));

  const result = reducer(state, action);

  expect(result.validWorld).toBe(true);
});

it('filters list to include only part of selectedWorld to 0 on CHANGE_WORLD', () => {
  const action = {
    type: 'CHANGE_WORLD',
    payload: 'a'
  };
  const state = produce(reducer(), draft => {
    draft.unfilteredList = ['aba', 'bab', 'cc', 'fd'];
    draft.list = ['test'];
  });
  const result = reducer(state, action);

  expect(result.list).toEqual(['aba', 'bab']);
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

  expect(result.map).toEqual(payload);
  expect(result.list).toEqual(['Antica', 'Xylana']);
  expect(result.unfilteredList).toEqual(['Antica', 'Xylana']);
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
  const state = produce(reducer(), draft => {
    draft.loading = true;
  });
  const result = reducer(state, action);

  expect(result.loading).toBe(false);
});

it('sets loading=false on LOAD_WORLDS_ERROR', () => {
  const action = {
    type: 'LOAD_WORLDS_ERROR'
  };
  const state = produce(reducer(), draft => {
    draft.loading = true;
  });
  const result = reducer(state, action);

  expect(result.loading).toBe(false);
});

it('sets error to payload of LOAD_WORLDS_ERROR', () => {
  const action = {
    type: 'LOAD_WORLDS_ERROR',
    payload: 'backend error'
  };
  const state = produce(reducer(), draft => {
    draft.error = '';
  });
  const result = reducer(state, action);

  expect(result.error).toEqual('backend error');
});

it('sets error to empty string if payload of LOAD_WORLDS_ERROR is undefined', () => {
  const action = {
    type: 'LOAD_WORLDS_ERROR'
  };
  const state = produce(reducer(), draft => {
    draft.error = 'err';
  });
  const result = reducer(state, action);

  expect(result.error).toEqual('');
});

it('sets loading=true on LOAD_WORLDS_STARTED', () => {
  const action = {
    type: 'LOAD_WORLDS_STARTED'
  };
  const state = produce(reducer(), draft => {
    draft.loading = false;
  });
  const result = reducer(state, action);

  expect(result.loading).toBe(true);
});

it('resets error on LOAD_WORLDS_STARTED', () => {
  const action = {
    type: 'LOAD_WORLDS_STARTED'
  };
  const state = produce(reducer(), draft => {
    draft.error = 'error';
  });
  const result = reducer(state, action);

  expect(result.error).toBe('');
});

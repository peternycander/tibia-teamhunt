import produce from 'immer';

const defaultState = Object.freeze({
  guilds: {},
  error: '',
  loading: false
});

export default (state = defaultState, action = {type: ''}) =>
  produce(state, draft => {
    switch (action.type) {
      case 'LOAD_GUILDS_STARTED': {
        draft.loading = true;
        draft.error = '';
        return;
      }
      case 'LOAD_GUILDS_ERROR': {
        draft.loading = false;
        draft.error = action.payload || '';
        return;
      }
      case 'LOAD_GUILDS_DONE': {
        draft.guilds = action.payload.reduce(
          (acc, world) => ({
            ...acc,
            [world]: false
          }),
          {}
        );
        draft.loading = false;
        return;
      }
      case 'TOGGLE_GUILD': {
        draft[action.payload] = !draft[action.payload];
        return;
      }
      default: {
        return;
      }
    }
  });

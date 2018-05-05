import produce from 'immer';

const defaultState = Object.freeze({
  guilds: {},
  error: '',
  loading: false,
  guildMembers: {}
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
        draft.guilds[action.payload] = !draft.guilds[action.payload];
        return;
      }
      default: {
        return;
      }
    }
  });

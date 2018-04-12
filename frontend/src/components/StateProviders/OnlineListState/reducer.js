import produce from 'immer';

const defaultState = Object.freeze({
  onlineList: {
    knights: [],
    paladins: [],
    druids: [],
    sorcerers: []
  },
  error: '',
  loading: false
});

export default (state = defaultState, action = {type: ''}) =>
  produce(state, draft => {
    switch (action.type) {
      case 'LOAD_PLAYERS_DONE': {
        const list = action.payload.list;
        const paladins = list.filter(p => p.vocation.includes('Paladin'));
        const knights = list.filter(p => p.vocation.includes('Knight'));
        const druids = list.filter(p => p.vocation.includes('Druid'));
        const sorcerers = list.filter(p => p.vocation.includes('Sorcerer'));
        draft.onlineList = {
          knights,
          druids,
          paladins,
          sorcerers
        };
        draft.loading = false;
        return;
      }
      case 'LOAD_PLAYERS_ERROR': {
        draft.error = action.payload;
        draft.loading = false;
        draft.onlineList = defaultState.onlineList;
        return;
      }
      case 'LOAD_PLAYERS_STARTED': {
        draft.loading = true;
        draft.error = '';
        return;
      }
      default: {
        return;
      }
    }
  });

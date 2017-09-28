import {fromJS} from 'immutable';

const defaultState = fromJS({
  worlds: {},
  error: '',
  loading: false
});

export default function(state = defaultState, action = {type: ''}) {
  switch (action.type) {
    case 'LOAD_PLAYERS_DONE': {
      const paladins = action.payload.list.filter(p => p.vocation.includes('Paladin'));
      const knights = action.payload.list.filter(p => p.vocation.includes('Knight'));
      const druids = action.payload.list.filter(p => p.vocation.includes('Druid'));
      const sorcerers = action.payload.list.filter(p => p.vocation.includes('Sorcerer'));
      return state
        .set('loading', false)
        .setIn(['worlds', action.payload.world, 'onlineList'], fromJS(action.payload.list))
        .setIn(['worlds', action.payload.world, 'paladins'], fromJS(paladins))
        .setIn(['worlds', action.payload.world, 'knights'], fromJS(knights))
        .setIn(['worlds', action.payload.world, 'druids'], fromJS(druids))
        .setIn(['worlds', action.payload.world, 'sorcerers'], fromJS(sorcerers));
    }
    case 'LOAD_PLAYERS_ERROR': {
      return state.set('error', action.payload).set('loading', false);
    }
    case 'LOAD_PLAYERS_STARTED': {
      return state.set('loading', true);
    }
    default: {
      return state;
    }
  }
}

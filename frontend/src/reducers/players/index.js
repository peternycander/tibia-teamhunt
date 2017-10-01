import {fromJS} from 'immutable';
import {MIN_START_LEVEL, MAX_START_LEVEL} from 'reducers/team';

const defaultState = fromJS({
  onlineList: {},
  error: '',
  optimalLevel: MIN_START_LEVEL + (MAX_START_LEVEL - MIN_START_LEVEL) / 2,
  loading: false
});
const levelComparatorFactory = level => (playerA, playerB) => {
  return Math.abs(level - playerA.get('level')) - Math.abs(level - playerB.get('level'));
};

export default function(state = defaultState, action = {type: ''}) {
  switch (action.type) {
    case 'LOAD_PLAYERS_DONE': {
      const levelComparator = levelComparatorFactory(state.get('optimalLevel'));
      const paladins = action.payload.list.filter(p => p.vocation.includes('Paladin'));
      const knights = action.payload.list.filter(p => p.vocation.includes('Knight'));
      const druids = action.payload.list.filter(p => p.vocation.includes('Druid'));
      const sorcerers = action.payload.list.filter(p => p.vocation.includes('Sorcerer'));
      return state
        .set('loading', false)
        .setIn(['onlineList', 'paladins'], fromJS(paladins).sort(levelComparator))
        .setIn(['onlineList', 'knights'], fromJS(knights).sort(levelComparator))
        .setIn(['onlineList', 'druids'], fromJS(druids).sort(levelComparator))
        .setIn(['onlineList', 'sorcerers'], fromJS(sorcerers).sort(levelComparator));
    }
    case 'LOAD_PLAYERS_ERROR': {
      return state.set('error', action.payload).set('loading', false);
    }
    case 'LOAD_PLAYERS_STARTED': {
      return state.set('loading', true);
    }
    case 'SET_CURRENT_PLAYER': {
      const {level} = action.payload;
      const min = Math.floor(level * (2 / 3));
      const max = Math.floor(level * (3 / 2));
      const optimalLevel = min + (max - min) / 2;
      const levelComparator = levelComparatorFactory(optimalLevel);
      return state
        .set('optimalLevel', optimalLevel)
        .setIn(
          ['onlineList', 'paladins'],
          state.getIn(['onlineList', 'paladins']).sort(levelComparator)
        )
        .setIn(
          ['onlineList', 'knights'],
          state.getIn(['onlineList', 'knights']).sort(levelComparator)
        )
        .setIn(
          ['onlineList', 'druids'],
          state.getIn(['onlineList', 'druids']).sort(levelComparator)
        )
        .setIn(
          ['onlineList', 'sorcerers'],
          state.getIn(['onlineList', 'sorcerers']).sort(levelComparator)
        );
    }
    default: {
      return state;
    }
  }
}

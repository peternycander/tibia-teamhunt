import { fromJS } from 'immutable';
import worlds from './worldMap';

const defaultState = fromJS({
  map: worlds,
  list: Object.values(worlds),
  selectedWorld: '',
  validWorld: false
});

export default function (state = defaultState, action = { type: '' }) {
  switch (action.type) {
    case 'CHANGE_WORLD': {
      const world = action.payload;
      return state
        .set('selectedWorld', world)
        .set('validWorld', !!state.getIn(['map', world.toLowerCase()]));
    }
    default: {
      return state;
    }
  }
}

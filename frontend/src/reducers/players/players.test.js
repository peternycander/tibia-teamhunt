import reducer from './index';
import {fromJS} from 'immutable';

it('sets players from payload of LOAD_PLAYERS_DONE', () => {
  const action = {
    type: 'LOAD_PLAYERS_DONE',
    payload: {
      list: [1, 2, 3],
      world: 'antica'
    }
  };
  const state = reducer();
  const result = reducer(state, action);

  expect(result.getIn(['worlds', 'antica', 'onlineList'])).toEqual(fromJS([1, 2, 3]));
});

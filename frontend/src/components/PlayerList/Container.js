import {connect} from 'react-redux';
import PlayerList from './PlayerList';
import {loadPlayers} from 'actions/world';
import {Map} from 'immutable';

function mapStateToProps(state) {
  const world = state.getIn(['worlds', 'validWorld'])
    ? state.getIn(['worlds', 'selectedWorld'])
    : undefined;

  const knights = world ? state.getIn(['players', 'onlineList', 'knights']) : undefined;
  const druids = world ? state.getIn(['players', 'onlineList', 'druids']) : undefined;
  const paladins = world ? state.getIn(['players', 'onlineList', 'paladins']) : undefined;
  const sorcerers = world ? state.getIn(['players', 'onlineList', 'sorcerers']) : undefined;
  return {
    world,
    error: state.getIn(['players', 'error']),
    loading: state.getIn(['players', 'loading']),
    knights,
    druids,
    paladins,
    sorcerers,
    shareRange: state.getIn(['team', 'shareRange']),
    haveDruid: state.getIn(['team', 'druid']) !== Map(),
    haveSorcerer: state.getIn(['team', 'sorcerer']) !== Map(),
    havePaladin: state.getIn(['team', 'paladin']) !== Map(),
    haveKnight: state.getIn(['team', 'knight']) !== Map()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPlayers: world => dispatch(loadPlayers(world))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);

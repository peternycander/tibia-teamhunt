import {connect} from 'react-redux';
import PlayerList from './PlayerList';
import {loadPlayers} from 'actions/world';

function mapStateToProps(state) {
  const world = state.getIn(['worlds', 'validWorld'])
    ? state.getIn(['worlds', 'selectedWorld'])
    : undefined;

  const players = world ? state.getIn(['players', 'worlds', world, 'onlineList']) : undefined;
  const knights = world ? state.getIn(['players', 'worlds', world, 'knights']) : undefined;
  const druids = world ? state.getIn(['players', 'worlds', world, 'druids']) : undefined;
  const paladins = world ? state.getIn(['players', 'worlds', world, 'paladins']) : undefined;
  const sorcerers = world ? state.getIn(['players', 'worlds', world, 'sorcerers']) : undefined;
  return {
    players,
    world,
    error: state.getIn(['players', 'error']),
    loading: state.getIn(['players', 'loading']),
    knights,
    druids,
    paladins,
    sorcerers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPlayers: world => dispatch(loadPlayers(world))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);

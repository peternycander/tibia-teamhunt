import { connect } from 'react-redux';
import WorldPicker from './WorldPicker';
import { changeWorld } from 'actions/world';

function mapStateToProps(state) {
  return {
    worlds: state.getIn(['worlds', 'list']),
    selectedWorld: state.getIn(['worlds', 'selectedWorld']),
    validWorld: state.getIn(['worlds', 'validWorld'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeWorld: world => dispatch(changeWorld(world))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorldPicker);

import {connect} from 'react-redux';
import WorldPicker from './WorldPicker';
import worldActions, {changeWorld, loadWorlds} from 'actions/world';

function mapStateToProps(state) {
  return {
    worlds: state.getIn(['worlds', 'list']),
    selectedWorld: state.getIn(['worlds', 'selectedWorld']),
    validWorld: state.getIn(['worlds', 'validWorld']),
    worldListVisible: state.getIn(['worlds', 'worldListVisible']),
    highlightedIndex: state.getIn(['worlds', 'highlightedIndex'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeWorld: world => dispatch(changeWorld(world)),
    loadWorlds: () => dispatch(loadWorlds()),
    highlightNextWorld: () => dispatch(worldActions.highlightNextWorld()),
    highlightPreviousWorld: () => dispatch(worldActions.highlightPreviousWorld()),
    showWorldList: () => dispatch(worldActions.showWorldList()),
    hideWorldList: () => dispatch(worldActions.hideWorldList()),
    selectHighlighted: () => dispatch(worldActions.selectHighlighted())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorldPicker);

import {connect} from 'react-redux';
import TeamBuilder from './TeamBuilder';
import {setCurrentPlayer} from 'actions/team';

function mapStateToProps(state) {
  return {
    currentPlayer: state.getIn(['team', 'currentPlayer'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentPlayer: player => dispatch(setCurrentPlayer(player))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamBuilder);

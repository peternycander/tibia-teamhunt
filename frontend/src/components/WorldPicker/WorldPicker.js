import React, {Component} from 'react';
import CustomSelect from 'components/CustomSelect';
import Error from 'components/Error';
import TryAgainButton from 'components/TryAgainButton';
import Loader from 'components/Loader';
import {Wrapper, ReloadButton} from './styled';
import ReloadIcon from './ReloadIcon';
import reducer from './reducer';
import actionsFactory from './actionsFactory';

class WorldPicker extends Component {
  constructor(props) {
    super(props);
    this.state = reducer(undefined, {
      type: 'INIT',
      payload: {world: props.selectedWorld}
    });
  }
  actions = actionsFactory(action =>
    this.setState(reducer(this.state, action))
  );
  componentDidMount() {
    this.actions.loadWorlds();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.validWorld !== this.state.validWorld &&
      this.state.validWorld
    ) {
      this.props.updateWorld(this.props.selectedWorld);
      this.props.loadPlayers(this.props.selectedWorld);
    }
  }
  render() {
    const {loadPlayers, selectedWorld} = this.props;
    const {validWorld, list: worlds, error, loading, world} = this.state;
    const {loadWorlds, changeWorld} = this.actions;

    if (error) {
      return (
        <div>
          <Error>{error}</Error>
          <TryAgainButton onClick={loadWorlds}>Try again</TryAgainButton>
        </div>
      );
    } else if (loading) {
      return <Loader />;
    }
    return (
      <Wrapper>
        <ReloadButton onClick={() => loadPlayers(selectedWorld)}>
          <ReloadIcon />
        </ReloadButton>
        <CustomSelect
          value={world}
          validSelection={validWorld}
          onChange={updatedWorld => changeWorld(updatedWorld)}
          writable
        >
          {worlds}
        </CustomSelect>
      </Wrapper>
    );
  }
}

export default WorldPicker;

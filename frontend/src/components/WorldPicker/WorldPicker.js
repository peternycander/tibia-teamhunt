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
    const {validWorld, world} = this.state;
    if (
      (validWorld !== prevState.validWorld || world !== prevState.world) &&
      validWorld
    ) {
      this.props.updateWorld(world);
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
      <Wrapper ref={ref => (this.mounted = ref)}>
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

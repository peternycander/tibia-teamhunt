import React, {Component} from 'react';
import CustomOption from './styled/CustomOption';
import CustomSelect from './CustomSelect';
import Error from 'components/Error';
import TryAgainButton from 'components/TryAgainButton';
import Loader from 'components/Loader';

export default class WorldPicker extends Component {
  componentDidMount() {
    this.props.loadWorlds();
  }
  render() {
    const {
      selectedWorld = 'Antica',
      changeWorld,
      validWorld,
      worlds,
      highlightNextWorld,
      highlightedIndex,
      selectHighlighted,
      highlightPreviousWorld,
      showWorldList,
      hideWorldList,
      error,
      loadWorlds,
      worldListVisible,
      loading
    } = this.props;
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
    const worldOptions = worlds.map((world, i) => (
      <CustomOption
        key={world}
        value={world}
        onMouseDown={() => changeWorld(world)}
        selected={highlightedIndex === i}
      >
        {world}
      </CustomOption>
    ));
    return (
      <CustomSelect
        value={selectedWorld}
        validWorld={validWorld}
        onChange={changeWorld}
        onUp={highlightPreviousWorld}
        onDown={highlightNextWorld}
        worldListVisible={worldListVisible}
        selectHighlighted={selectHighlighted}
        showWorldList={showWorldList}
        hideWorldList={hideWorldList}
        highlightedIndex={highlightedIndex}
      >
        {worldOptions}
      </CustomSelect>
    );
  }
}

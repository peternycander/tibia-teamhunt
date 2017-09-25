import React, {Component} from 'react';
import CustomOption from './styled/CustomOption';
import CustomSelect from './CustomSelect';

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
      worldListVisible
    } = this.props;
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

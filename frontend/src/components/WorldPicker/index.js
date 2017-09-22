import React from 'react';
import worlds from './worlds';
import CustomOption from './CustomOption';
import CustomSelect from './CustomSelect';

export default function WorldPicker({
  selectedWorld = 'Antica',
  changeWorld,
  validWorld
}) {
  const worldOptions = Object.keys(worlds).map(world => (
    <CustomOption key={world} value={world}>
      {world}
    </CustomOption>
  ));
  return (
    <CustomSelect
      value={selectedWorld}
      validWorld={validWorld}
      onChange={e => {
        const world = e.target.value;
        let worldInfo = {world};
        if (worlds[world]) {
          worldInfo.valid = true;
        }
        changeWorld(worldInfo);
      }}
    >
      {worldOptions}
    </CustomSelect>
  );
}

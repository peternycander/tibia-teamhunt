import React from 'react';
import worlds from './worlds';
import CustomOption from './CustomOption';
import CustomSelect from './CustomSelect';

export default function WorldPicker({selectedWorld = 'Antica', changeWorld, validWorld}) {
  const worldOptions = Object.keys(worlds)
    .filter(world => world.toLowerCase().includes(selectedWorld.toLowerCase()))
    .map(world => (
      <CustomOption key={world} value={world} onMouseDown={() => changeWorld({world, valid: true})}>
        {world}
      </CustomOption>
    ));
  return (
    <CustomSelect
      value={selectedWorld}
      validWorld={validWorld}
      onChange={world => {
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

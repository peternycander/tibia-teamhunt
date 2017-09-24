import React from 'react';
import CustomOption from './styled/CustomOption';
import CustomSelect from './CustomSelect';

export default function WorldPicker({ selectedWorld = 'Antica', changeWorld, validWorld, worlds }) {
  const worldOptions = worlds
    .filter(world => world
      .toLowerCase()
      .includes(selectedWorld.toLowerCase()))
    .map(world => (
      <CustomOption key={world} value={world} onMouseDown={() => changeWorld(world)}>
        {world}
      </CustomOption>
    ));
  return (
    <CustomSelect
      value={selectedWorld}
      validWorld={validWorld}
      onChange={changeWorld}
    >
      {worldOptions}
    </CustomSelect>
  );
}

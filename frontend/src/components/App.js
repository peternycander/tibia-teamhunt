import React from 'react';
import Header from 'components/Header';
import WorldPicker from 'components/WorldPicker';
import LevelPicker from 'components/LevelPicker';
import PlayerList from 'components/PlayerList';
import styled from 'styled-components';
import InputState from 'components/StateProviders/InputState';
import OnlineListState from 'components/StateProviders/OnlineListState';

const Body = styled.div`
  width: 60rem;
  max-width: 90vw;
  margin: 0 auto;
`;

const SubHeader = styled.h3`
  text-align: center;
`;

const App = ({
  styled,
  updateLevel,
  updateWorld,
  world,
  level,
  error,
  loading,
  onlineList,
  loadPlayers
}) => (
  <div>
    <Header>Tibia Teamhunt</Header>
    <Body>
      <SubHeader>Pick your world</SubHeader>
      <WorldPicker
        updateWorld={updateWorld}
        selectedWorld={world}
        loadPlayers={loadPlayers}
      />
      <LevelPicker updateLevel={updateLevel} level={level} />
      <PlayerList
        level={level}
        error={error}
        world={world}
        loading={loading}
        onlineList={onlineList}
        loadPlayers={loadPlayers}
      />
    </Body>
  </div>
);

export default () => (
  <InputState>
    {({updateLevel, updateWorld, state: {world, level}}) => (
      <OnlineListState>
        {({state: {error, loading, onlineList}, actions: {loadPlayers}}) => (
          <App
            updateLevel={updateLevel}
            updateWorld={updateWorld}
            world={world}
            level={level}
            error={error}
            loading={loading}
            onlineList={onlineList}
            loadPlayers={loadPlayers}
          />
        )}
      </OnlineListState>
    )}
  </InputState>
);

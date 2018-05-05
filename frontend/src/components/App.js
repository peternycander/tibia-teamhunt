import React from 'react';
import Header from 'components/Header';
import WorldPicker from 'components/WorldPicker';
import LevelPicker from 'components/LevelPicker';
import PlayerList from 'components/PlayerList';
import styled from 'styled-components';
import InputState from 'components/StateProviders/InputState';
import OnlineListState from 'components/StateProviders/OnlineListState';
import GuildBlacklist from './GuildBlacklist';
import media from 'globals/media';

const Body = styled.div`
  grid-area: body;
`;

const AppWrapper = styled.div`
  display: grid;
  margin-right: 5vw;
  min-height: 100vh;
  grid-template-areas:
    'sidebar header header header header header'
    'sidebar body body body body body';
  ${media.smallDesktop`
  margin-left: 5vw;  
  grid-template-areas:
    'header header header header header'
    'body body body body body';
  `};
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
  <AppWrapper>
    <Header>Tibia Teamhunt</Header>
    <GuildBlacklist world={world} />
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
  </AppWrapper>
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

import React from 'react';
import Header from 'components/Header';
import WorldPicker from 'components/WorldPicker';
import TeamBuilder from 'components/TeamBuilder';
import PlayerList from 'components/PlayerList';
import styled from 'styled-components';
import {Provider as WorldProvider} from 'contexts/WorldContext';
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

class App extends React.Component {
  render() {
    return (
      <div>
        <Header>Tibia Teamhunt</Header>
        <Body>
          <InputState>
            {({updatePlayer, updateWorld, state: {world, player}}) => (
              <WorldProvider value={world}>
                <OnlineListState>
                  {({
                    state: {error, loading, onlineList},
                    actions: {loadPlayers}
                  }) => (
                    <React.Fragment>
                      <SubHeader>Pick your world</SubHeader>
                      <WorldPicker
                        updateWorld={updateWorld}
                        loadPlayers={loadPlayers}
                      />
                      <TeamBuilder
                        updatePlayer={updatePlayer}
                        player={player}
                      />
                      <PlayerList
                        level={player.level}
                        error={error}
                        loading={loading}
                        onlineList={onlineList}
                        loadPlayers={loadPlayers}
                      />
                    </React.Fragment>
                  )}
                </OnlineListState>
              </WorldProvider>
            )}
          </InputState>
        </Body>
      </div>
    );
  }
}

export default App;

import React from 'react';
import Header from 'components/Header';
import WorldPicker from 'components/WorldPicker/Container';
import TeamBuilder from 'components/TeamBuilder/Container';
import PlayerList from 'components/PlayerList/Container';
import './App.css';
import styled from 'styled-components';

const Body = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <div>
      <Header>Tibia Teamhunt</Header>
      <Body>
        <h3>Pick your world</h3>
        <WorldPicker />
        <TeamBuilder />
        <PlayerList />
      </Body>
    </div>
  );
}

export default App;

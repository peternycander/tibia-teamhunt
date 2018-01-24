import React from 'react';
import Header from 'components/Header';
import WorldPicker from 'components/WorldPicker';
import TeamBuilder from 'components/TeamBuilder';
import PlayerList from 'components/PlayerList';
import './App.css';
import styled from 'styled-components';

const Body = styled.div`
  padding-top: 20px;
  max-width: 60rem;
  margin: 0 auto;
`;

const SubHeader = styled.h3`
  text-align: center;
`;

function App() {
  return (
    <div>
      <Header>Tibia Teamhunt</Header>
      <Body>
        <SubHeader>Pick your world</SubHeader>
        <WorldPicker />
        <TeamBuilder />
        <PlayerList />
      </Body>
    </div>
  );
}

export default App;

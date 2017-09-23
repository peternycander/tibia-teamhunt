import React, {Component} from 'react';
import Header from 'components/Header';
import WorldPicker from 'components/WorldPicker';
import './App.css';
import styled from 'styled-components';

const Body = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      world: 'Antica',
      validWorld: true
    };
    this.changeWorld = this.changeWorld.bind(this);
  }
  changeWorld({world, valid}) {
    this.setState({world, validWorld: valid});
  }
  render() {
    return (
      <div>
        <Header>Tibia Teamhunt</Header>
        <Body>
          <h3>Pick your world</h3>
          <WorldPicker
            changeWorld={this.changeWorld}
            selectedWorld={this.state.world}
            validWorld={this.state.validWorld}
          />
        </Body>
      </div>
    );
  }
}

export default App;

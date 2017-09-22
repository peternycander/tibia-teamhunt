import React, {Component} from 'react';
import Header from 'components/Header';
import WorldPicker from 'components/WorldPicker';
import './App.css';

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
        <div>
          <WorldPicker
            changeWorld={this.changeWorld}
            selectedWorld={this.state.world}
            validWorld={this.state.validWorld}
          />
        </div>
      </div>
    );
  }
}

export default App;

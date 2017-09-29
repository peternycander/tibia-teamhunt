import React, {Component} from 'react';

export default class TeamBuilder extends Component {
  constructor(props) {
    super();
    this.state = {
      currentPlayer: props.currentPlayer.toJS() || {
        name: '',
        vocation: 'Knight',
        level: 100
      }
    };
    this.setCurrentPlayer = this.setCurrentPlayer.bind(this);
  }

  setCurrentPlayer(values) {
    this.setState(
      {
        currentPlayer: {
          ...this.state.currentPlayer,
          ...values
        }
      },
      () => {
        this.props.setCurrentPlayer(this.state.currentPlayer);
      }
    );
  }

  render() {
    const {level, vocation} = this.state.currentPlayer;

    return (
      <div>
        <input onChange={e => this.setCurrentPlayer({level: e.target.value})} value={level} />
        <select onChange={e => this.setCurrentPlayer({vocation: e.target.value})} value={vocation}>
          <option value='Knight'>Knight</option>
          <option value='Paladin'>Paladin</option>
          <option value='Druid'>Druid</option>
          <option value='Paladin'>Paladin</option>
        </select>
      </div>
    );
  }
}

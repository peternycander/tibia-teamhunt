import React, {Component} from 'react';
import {PlayerInput} from './styled';

export default class TeamBuilder extends Component {
  render() {
    const {updatePlayer, player: {level}} = this.props;
    return (
      <PlayerInput>
        <label htmlFor='level-picker'>Your level: </label>
        <input
          id='level-picker'
          type='number'
          onChange={e => updatePlayer({level: e.target.value})}
          value={level}
        />
      </PlayerInput>
    );
  }
}

import React, {Component} from 'react';
import {PlayerInput} from './styled';

export default class LevelPicker extends Component {
  render() {
    const {updateLevel, level} = this.props;
    return (
      <PlayerInput>
        <label htmlFor='level-picker'>Your level: </label>
        <input
          id='level-picker'
          type='number'
          onChange={e => updateLevel(e.target.value)}
          value={level}
        />
      </PlayerInput>
    );
  }
}

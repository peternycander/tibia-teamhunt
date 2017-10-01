import React, {Component} from 'react';
import CustomSelect from 'components/CustomSelect';
import {fromJS} from 'immutable';
import PlayerInput from './styled/PlayerInput';
const vocations = fromJS(['Knight', 'Paladin', 'Druid', 'Sorcerer']);
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
      <PlayerInput>
        <input onChange={e => this.setCurrentPlayer({level: e.target.value})} value={level} />
        <CustomSelect onChange={e => this.setCurrentPlayer({vocation: e})} value={vocation}>
          {vocations}
        </CustomSelect>
      </PlayerInput>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';

class InputState extends React.Component {
  constructor(props) {
    super(props);
    const player = {
      level: 100
    };
    let world = 'Antica';
    try {
      const level = localStorage.getItem('level') || 100;
      player.level = parseInt(level, 10);
      world = localStorage.getItem('world') || 'Antica';
    } catch (err) {
      //Ignore error
      player.level = 100;
    }
    this.state = {
      player,
      world
    };
  }
  static propTypes = {
    children: PropTypes.func
  };

  updatePlayer = player =>
    this.setState({player}, () => {
      try {
        localStorage.setItem('level', player.level);
      } catch (err) {
        //ignore
      }
    });
  updateWorld = world => this.setState({world});

  render() {
    return this.props.children({
      updatePlayer: this.updatePlayer,
      updateWorld: this.updateWorld,
      state: this.state
    });
  }
}

export default InputState;

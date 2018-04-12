import React from 'react';
import PropTypes from 'prop-types';

class InputState extends React.Component {
  constructor(props) {
    super(props);
    let level = 100;
    let world = 'Antica';
    try {
      level = localStorage.getItem('level') || 100;
      level = parseInt(level, 10);
      world = localStorage.getItem('world') || 'Antica';
    } catch (err) {
      //Ignore error
      level = 100;
    }
    this.state = {
      level,
      world
    };
  }
  static propTypes = {
    children: PropTypes.func
  };

  updateLevel = level =>
    this.setState({level}, () => {
      try {
        localStorage.setItem('level', level);
      } catch (err) {
        //ignore
      }
    });
  updateWorld = world => this.setState({world});

  render() {
    return this.props.children({
      updateLevel: this.updateLevel,
      updateWorld: this.updateWorld,
      state: this.state
    });
  }
}

export default InputState;

import React from 'react';
import PropTypes from 'prop-types';
import reducer from './reducer';
import actionsFactory from './actionsFactory';

class OnlineListState extends React.Component {
  state = reducer();

  actions = actionsFactory(action =>
    this.setState(reducer(this.state, action))
  );

  static propTypes = {
    children: PropTypes.func
  };

  render() {
    return this.props.children({
      state: this.state,
      actions: this.actions
    });
  }
}

export default OnlineListState;

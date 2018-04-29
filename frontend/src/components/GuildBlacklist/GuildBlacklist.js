import React, {Component} from 'react';
import PropTypes from 'prop-types';

import reducer from './reducer';
import actionsFactory from './actionsFactory';

export default class GuildBlacklist extends Component {
  state = reducer();
  static propTypes = {
    world: PropTypes.string.isRequired
  };
  actions = actionsFactory(action =>
    this.setState(reducer(this.state, action))
  );
  componentDidMount() {
    this.actions.loadGuilds(this.props.world);
  }
  render() {
    const {guilds} = this.state;
    return (
      <div>
        {Object.entries(guilds).map(([guild, guildBlacklisted]) => (
          <div key={guild}>
            <label htmlFor={guild}>{guild}</label>
            <input id={guild} type='checkbox' checked={guildBlacklisted} />
          </div>
        ))}
      </div>
    );
  }
}

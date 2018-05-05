import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Wrapper, Guild} from './styled';
import reducer from './reducer';
import actionsFactory from './actionsFactory';

export default class GuildBlacklist extends Component {
  state = reducer();
  static propTypes = {
    world: PropTypes.string.isRequired
  };
  actions = actionsFactory(action =>
    this.setState(
      reducer(this.state, action),
      prevState =>
        console.log('action', action) || console.log('state', this.state)
    )
  );
  componentDidMount() {
    this.actions.loadGuilds(this.props.world);
  }
  render() {
    const {guilds} = this.state;
    return (
      <Wrapper>
        <h2>Guild Blacklist</h2>
        {Object.entries(guilds).map(([guild, guildBlacklisted]) => (
          <Guild key={guild}>
            <input
              id={guild}
              type='checkbox'
              checked={guildBlacklisted}
              onChange={e => this.actions.toggleGuild(guild, e)}
            />
            <label htmlFor={guild}>{guild}</label>
          </Guild>
        ))}
      </Wrapper>
    );
  }
}

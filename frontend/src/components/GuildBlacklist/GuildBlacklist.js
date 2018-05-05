import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reducer from './reducer';
import actionsFactory from './actionsFactory';
import Guild from './Guild';

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
  componentDidUpdate(prevProps) {
    if (prevProps.world !== this.props.world) {
      this.actions.loadGuilds(this.props.world);
    }
  }
  render() {
    const {guilds} = this.state;
    const {
      blacklistedGuilds,
      removeGuildFromBlacklist,
      addGuildToBlacklist
    } = this.props;
    return (
      <React.Fragment>
        <h2>Guild Blacklist</h2>
        <ul>
          {Object.entries(guilds).map(([guild, guildBlacklisted]) => (
            <Guild
              key={guild}
              name={guild}
              blacklistedGuilds={blacklistedGuilds}
              addGuildToBlacklist={addGuildToBlacklist}
              removeGuildFromBlacklist={removeGuildFromBlacklist}
            />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

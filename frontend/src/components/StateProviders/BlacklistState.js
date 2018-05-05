import React from 'react';
import PropTypes from 'prop-types';

class BlacklistState extends React.Component {
  state = {
    blacklist: {},
    guilds: {}
  };
  static propTypes = {
    children: PropTypes.func
  };
  addGuildToBlacklist = ({name, list}) => {
    const objectBlacklist = list.reduce(
      (acc, member) => ({...acc, [member]: true}),
      {}
    );
    this.setState({
      blacklist: {...this.state.blacklist, ...objectBlacklist},
      guilds: {
        ...this.state.guilds,
        [name]: objectBlacklist
      }
    });
  };
  removeGuildFromBlacklist = guild =>
    this.state.guilds[guild] &&
    this.setState({
      blacklist: {
        ...this.state.blacklist,
        ...Object.keys(this.state.guilds[guild]).reduce(
          (acc, player) => ({...acc, [player]: undefined}),
          {}
        )
      },
      guilds: {
        ...this.state.guilds,
        [guild]: undefined
      }
    });

  render() {
    return this.props.children({
      blacklist: this.state.blacklist,
      addGuildToBlacklist: this.addGuildToBlacklist,
      removeGuildFromBlacklist: this.removeGuildFromBlacklist,
      blacklistedGuilds: this.state.guilds
    });
  }
}

export default BlacklistState;

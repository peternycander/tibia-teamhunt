import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Guild extends Component {
  state = {
    checked: false,
    loading: false,
    error: '',
    members: []
  };
  static propTypes = {
    name: PropTypes.string.isRequired,
    addGuildToBlacklist: PropTypes.func.isRequired,
    removeGuildFromBlacklist: PropTypes.func.isRequired
  };

  static getDerivedStateFromProps(props) {
    return {
      checked: !!props.blacklistedGuilds[props.name]
    };
  }

  loadGuild = async () => {
    const guild = this.props.name;
    this.setState({
      loading: true,
      error: ''
    });
    let guildMembers;
    try {
      let response = await fetch(`/guilds/${guild}`);
      if (!response.ok) {
        this.setState({
          loading: false,
          error: 'Cannot connect to tibia.com'
        });
        return;
      }
      guildMembers = await response.json();
    } catch (error) {
      console.error(error);
      this.setState({
        loading: false,
        error: 'Cannot connect to tibia.com'
      });
      return;
    }
    this.setState(
      {
        loading: false,
        members: guildMembers
      },
      () => {
        if (this.state.checked) {
          this.props.addGuildToBlacklist({
            name: this.props.name,
            list: this.state.members
          });
        }
      }
    );
  };
  toggleGuild = () => this.setState({checked: !this.state.checked});
  async componentDidUpdate(_, prevState) {
    if (!prevState.checked && this.state.checked) {
      if (this.state.members.length === 0) {
        await this.loadGuild();
      } else {
        this.props.addGuildToBlacklist({
          name: this.props.name,
          list: this.state.members
        });
      }
    } else if (prevState.checked && !this.state.checked) {
      this.props.removeGuildFromBlacklist(this.props.name);
    }
  }
  render() {
    const {name} = this.props;
    return (
      <li>
        <input
          id={name}
          type='checkbox'
          checked={this.state.checked}
          onChange={() => this.toggleGuild()}
        />
        <label htmlFor={name}>{name}</label>
      </li>
    );
  }
}

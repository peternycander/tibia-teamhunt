import React, {Component} from 'react';
import Error from 'components/Error';
import TryAgainButton from 'components/TryAgainButton';
import Loader from 'components/Loader';
import {List} from 'immutable';

export default class PlayerList extends Component {
  componentDidMount() {
    const {world, loadPlayers} = this.props;
    if (world) {
      loadPlayers(world);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.world && nextProps.world !== this.props.world) {
      this.props.loadPlayers(nextProps.world);
    }
  }

  render() {
    const {players = List(), error, loadPlayers, loading} = this.props;
    if (error) {
      return (
        <div>
          <Error>{error}</Error>
          <TryAgainButton onClick={loadPlayers}>Try again</TryAgainButton>
        </div>
      );
    } else if (loading) {
      return <Loader />;
    }
    const playerList = players.map(player => (
      <div key={player.get('name')}>
        <span>{player.get('name')}</span>
        <span>{player.get('level')}</span>
        <span>{player.get('vocation')}</span>
      </div>
    ));
    return <div>{playerList}</div>;
  }
}

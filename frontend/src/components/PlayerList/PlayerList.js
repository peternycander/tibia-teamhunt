import React, {Component} from 'react';
import Error from 'components/Error';
import TryAgainButton from 'components/TryAgainButton';
import Loader from 'components/Loader';
import Player from './styled/Player';
import VocationGrid from './styled/VocationGrid';
import {List} from 'immutable';

const getDomPlayer = player => (
  <Player key={player.get('name')}>
    <span>{player.get('name')}</span>
    <span>{player.get('level')}</span>
  </Player>
);
export default class PlayerList extends Component {
  constructor() {
    super();
    this.state = {
      minimizeKnights: false,
      minimizePaladins: false,
      minimizeDruids: false,
      minimizeSorcerers: false
    };
    this.toggleMinimized = this.toggleMinimized.bind(this);
  }

  toggleMinimized(vocation) {
    const key = `minimize${vocation.charAt(0).toUpperCase()}${vocation.substring(1)}`;
    const updatedState = {};
    updatedState[key] = !this.state[key];
    this.setState(updatedState);
  }

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
    const {
      players = List(),
      druids = List(),
      knights = List(),
      paladins = List(),
      sorcerers = List(),
      error,
      loadPlayers,
      loading
    } = this.props;
    if (error) {
      return (
        <div>
          <Error>{error}</Error>
          <TryAgainButton onClick={loadPlayers}>Try again</TryAgainButton>
        </div>
      );
    } else if (loading) {
      return <Loader />;
    } else if (players === List()) {
      return null;
    }
    const druidList = druids.map(getDomPlayer);
    const knightList = knights.map(getDomPlayer);
    const paladinList = paladins.map(getDomPlayer);
    const sorcererList = sorcerers.map(getDomPlayer);
    return (
      <VocationGrid>
        <div>
          <h4 onClick={() => this.toggleMinimized('druids')}>Druids</h4>
          <div style={this.state.minimizeDruids ? {display: 'none'} : {}}>{druidList}</div>
        </div>
        <div>
          <h4 onClick={() => this.toggleMinimized('knights')}>Knights</h4>
          <div style={this.state.minimizeKnights ? {display: 'none'} : {}}>{knightList}</div>
        </div>
        <div>
          <h4 onClick={() => this.toggleMinimized('paladins')}>Paladins</h4>
          <div style={this.state.minimizePaladins ? {display: 'none'} : {}}>{paladinList}</div>
        </div>
        <div>
          <h4 onClick={() => this.toggleMinimized('sorcerers')}>Sorcerers</h4>
          <div style={this.state.minimizeSorcerers ? {display: 'none'} : {}}>{sorcererList}</div>
        </div>
      </VocationGrid>
    );
  }
}

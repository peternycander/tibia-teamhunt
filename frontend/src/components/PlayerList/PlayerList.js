import React, {Component} from 'react';
import Error from 'components/Error';
import TryAgainButton from 'components/TryAgainButton';
import Loader from 'components/Loader';
import {VocationGrid, Player} from './styled';
import {List} from 'immutable';

const getDomPlayerFactory = shareRange => player => (
  <Player
    key={player.get('name')}
    sharable={player.get('level') >= shareRange.get('min') && player.get('level') <= shareRange.get('max')}
  >
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
      druids = List(),
      knights = List(),
      paladins = List(),
      sorcerers = List(),
      error,
      loadPlayers,
      loading,
      shareRange,
      haveDruid,
      havePaladin,
      haveKnight,
      haveSorcerer,
      world
    } = this.props;
    if (error) {
      return (
        <div>
          <Error>{error}</Error>
          <TryAgainButton onClick={() => loadPlayers(world)}>Try again</TryAgainButton>
        </div>
      );
    } else if (loading) {
      return <Loader />;
    } else if (!(druids.size || knights.size || paladins.size || sorcerers.size)) {
      return null;
    }
    const getDomPlayer = getDomPlayerFactory(shareRange);
    const druidList = druids.map(getDomPlayer);
    const knightList = knights.map(getDomPlayer);
    const paladinList = paladins.map(getDomPlayer);
    const sorcererList = sorcerers.map(getDomPlayer);
    const minimizeDruids = this.state.minimizeDruids || haveDruid;
    const minimizePaladins = this.state.minimizePaladins || havePaladin;
    const minimizeKnights = this.state.minimizeKnights || haveKnight;
    const minimizeSorcerers = this.state.minimizeSorcerers || haveSorcerer;
    return (
      <VocationGrid>
        <div style={minimizeDruids ? {display: 'none'} : {}}>
          <h4 onClick={() => this.toggleMinimized('druids')}>Druids</h4>
          <div>{druidList}</div>
        </div>
        <div style={minimizeKnights ? {display: 'none'} : {}}>
          <h4 onClick={() => this.toggleMinimized('knights')}>Knights</h4>
          <div>{knightList}</div>
        </div>
        <div style={minimizePaladins ? {display: 'none'} : {}}>
          <h4 onClick={() => this.toggleMinimized('paladins')}>Paladins</h4>
          <div>{paladinList}</div>
        </div>
        <div style={minimizeSorcerers ? {display: 'none'} : {}}>
          <h4 onClick={() => this.toggleMinimized('sorcerers')}>Sorcerers</h4>
          <div>{sorcererList}</div>
        </div>
      </VocationGrid>
    );
  }
}

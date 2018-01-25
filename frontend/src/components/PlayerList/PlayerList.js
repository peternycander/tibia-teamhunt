import React, {Component} from 'react';
import Error from 'components/Error';
import TryAgainButton from 'components/TryAgainButton';
import Loader from 'components/Loader';
import {VocationGrid, StyledList, ListWrapper} from './styled';
import Player from './Player';
import {List} from 'immutable';

const getDomPlayerFactory = shareRange => player => (
  <Player key={player.get('name')} shareRange={shareRange} player={player} />
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
    const minimizeDruids = this.state.minimizeDruids;
    const minimizePaladins = this.state.minimizePaladins;
    const minimizeKnights = this.state.minimizeKnights;
    const minimizeSorcerers = this.state.minimizeSorcerers;
    return (
      <VocationGrid>
        <ListWrapper hide={haveDruid} minimized={minimizeDruids}>
          <h4 onClick={() => this.toggleMinimized('druids')}>Druids</h4>
          <StyledList hide={minimizeDruids}>{druidList}</StyledList>
        </ListWrapper>
        <ListWrapper hide={haveKnight} minimized={minimizeKnights}>
          <h4 onClick={() => this.toggleMinimized('knights')}>Knights</h4>
          <StyledList hide={minimizeKnights}>{knightList}</StyledList>
        </ListWrapper>
        <ListWrapper hide={havePaladin} minimized={minimizePaladins}>
          <h4 onClick={() => this.toggleMinimized('paladins')}>Paladins</h4>
          <StyledList hide={minimizePaladins}>{paladinList}</StyledList>
        </ListWrapper>
        <ListWrapper hide={haveSorcerer} minimized={minimizeSorcerers}>
          <h4 onClick={() => this.toggleMinimized('sorcerers')}>Sorcerers</h4>
          <StyledList hide={minimizeSorcerers}>{sorcererList}</StyledList>
        </ListWrapper>
      </VocationGrid>
    );
  }
}

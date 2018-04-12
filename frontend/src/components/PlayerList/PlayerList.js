import React, {Component} from 'react';
import Error from 'components/Error';
import TryAgainButton from 'components/TryAgainButton';
import Loader from 'components/Loader';
import {VocationGrid, StyledList, ListWrapper} from './styled';
import Player from './Player';
import getShareRange from 'utils/getShareRange';

const getDomPlayerFactory = shareRange => player => (
  <Player key={player.name} shareRange={shareRange} player={player} />
);
class PlayerList extends Component {
  state = {
    knights: false,
    paladins: false,
    druids: false,
    sorcerers: false
  };

  componentDidMount() {
    const {world, loadPlayers} = this.props;

    if (world) {
      loadPlayers(world);
    }
  }

  componentDidUpdate(prevProps) {
    const {loadPlayers, level, world} = this.props;
    if (world && prevProps.world !== world) {
      loadPlayers({world, level});
    }
  }

  toggleMinimized = vocation => {
    this.setState({[vocation]: !this.state[vocation]});
  };

  render() {
    const {error, loading, onlineList, loadPlayers, level, world} = this.props;

    if (error) {
      return (
        <div>
          <Error>{error}</Error>
          <TryAgainButton onClick={() => loadPlayers({world, level})}>
            Try again
          </TryAgainButton>
        </div>
      );
    } else if (loading) {
      return <Loader />;
    } else if (
      !(
        onlineList.druids.length ||
        onlineList.knights.length ||
        onlineList.paladins.length ||
        onlineList.sorcerers.length
      )
    ) {
      return null;
    }
    const shareRange = getShareRange(level);
    const levelComparator = levelComparatorFactory(shareRange);
    const getDomPlayer = getDomPlayerFactory(shareRange);
    return (
      <VocationGrid>
        {['druids', 'knights', 'paladins', 'sorcerers'].map(vocation => (
          <ListWrapper key={vocation} minimized={this.state[vocation]}>
            <h4 onClick={() => this.toggleMinimized(vocation)}>
              {vocation.charAt(0).toUpperCase()}
              {vocation.substring(1)}
            </h4>
            <StyledList hide={this.state[vocation]}>
              {onlineList[vocation]
                .slice()
                .sort(levelComparator)
                .map(getDomPlayer)}
            </StyledList>
          </ListWrapper>
        ))}
      </VocationGrid>
    );
  }
}

export default PlayerList;

const levelComparatorFactory = ({min, max}) => {
  const level = min + (max - min) / 2;
  return (playerA, playerB) =>
    Math.abs(level - playerA.level) - Math.abs(level - playerB.level);
};

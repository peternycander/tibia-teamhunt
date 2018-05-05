import React, {Component} from 'react';
import Error from 'components/Error';
import TryAgainButton from 'components/TryAgainButton';
import Loader from 'components/Loader';
import {VocationGrid, StyledList, ListWrapper} from './styled';
import Player from './Player';
import getShareRange from 'utils/getShareRange';
const VOCATIONS = ['druids', 'knights', 'paladins', 'sorcerers'];
const getDomPlayerFactory = shareRange => (player, blacklisted) => (
  <Player
    key={player.name}
    shareRange={shareRange}
    player={player}
    blacklisted={blacklisted}
  />
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
    const {loadPlayers, world} = this.props;
    if (world && prevProps.world !== world) {
      loadPlayers(world);
    }
  }

  toggleMinimized = vocation => {
    this.setState({[vocation]: !this.state[vocation]});
  };

  render() {
    const {
      error,
      loading,
      onlineList,
      loadPlayers,
      level,
      world,
      blacklist
    } = this.props;
    const hidden = this.state;
    if (error) {
      return (
        <div>
          <Error>{error}</Error>
          <TryAgainButton onClick={() => loadPlayers(world)}>
            Try again
          </TryAgainButton>
        </div>
      );
    } else if (loading) {
      return <Loader />;
    } else if (VOCATIONS.every(voc => onlineList[voc].length === 0)) {
      return null;
    }
    const shareRange = getShareRange(level);
    const levelComparator = levelComparatorFactory(shareRange);
    const getDomPlayer = getDomPlayerFactory(shareRange);
    return (
      <VocationGrid>
        {VOCATIONS.map(vocation => (
          <ListWrapper key={vocation} minimized={hidden[vocation]}>
            <h4 onClick={() => this.toggleMinimized(vocation)}>
              {`${vocation.charAt(0).toUpperCase()}${vocation.substring(1)}`}
            </h4>
            {!hidden[vocation] && (
              <StyledList>
                {onlineList[vocation]
                  .slice()
                  .sort(levelComparator)
                  .map(player => getDomPlayer(player, blacklist[player.name]))}
              </StyledList>
            )}
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

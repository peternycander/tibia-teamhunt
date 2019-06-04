import React from 'react';
import CopyIcon from './CopyIcon';
import FreeAccountIcon from './FreeAccountIcon';
import clipboard from 'clipboard-js';
import {Player as Wrapper, FullWidth, CopyButton, PlayerName} from './styled';

const promotionNames = {
  //Note the non breaking spaces
  'Elite Knight': true,
  'Master Sorcerer': true,
  'Elder Druid': true,
  'Royal Paladin': true
};
const promoted = vocation => Boolean(promotionNames[vocation]);
export default class Player extends React.Component {
  state = {
    showCopied: false
  };
  copyText = async text => {
    await clipboard.copy(text);
    this.setState({showCopied: true});
    setTimeout(() => {
      if (!this.mountCheck) {
        return;
      }
      this.setState({showCopied: false});
    }, 2000);
  };
  shouldComponentUpdate(
    {
      player: {level},
      shareRange,
      blacklisted
    },
    {showCopied}
  ) {
    if (showCopied !== this.state.showCopied) {
      return true;
    }
    if (blacklisted !== this.props.blacklisted) {
      return true;
    }
    const prevShareRange = this.props.shareRange;
    if (
      (level >= shareRange.min && level <= shareRange.max) ===
      (level >= prevShareRange.min && level <= prevShareRange.max)
    ) {
      return false;
    }
    return true;
  }
  render() {
    const {player, shareRange, blacklisted} = this.props;
    const {showCopied} = this.state;
    const isPromoted = promoted(player.vocation);
    return (
      <Wrapper
        ref={e => (this.mountCheck = e)}
        sharable={
          player.level >= shareRange.min && player.level <= shareRange.max
        }
        blacklisted={blacklisted}
        promoted={isPromoted}
      >
        {showCopied ? (
          <FullWidth>Copied name to clipboard</FullWidth>
        ) : (
          <React.Fragment>
            <CopyButton
              onClick={() => this.copyText(player.name)}
              title='Copy name to clipboard'
            >
              <CopyIcon />
            </CopyButton>
            <PlayerName
              href={`https://www.tibia.com/community/?subtopic=characters&name=${encodeURIComponent(
                player.name
              )}`}
              target='_blank'
              promoted={isPromoted}
            >
              {!isPromoted && <FreeAccountIcon />}
              {player.name}
            </PlayerName>
            <span>{player.level}</span>
          </React.Fragment>
        )}
      </Wrapper>
    );
  }
}
